import ImageIcon from '@/assets/Icons/AddImage.svg';
import EditIcon from '@/assets/Icons/edit.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import {UserBirthDate} from '@/screens/components/common/BirthDateForm';
import CustomBtn from '@/screens/components/common/button/Button';
import {Email} from '@/screens/components/common/emailInput';
import {Phone} from '@/screens/components/common/phoneInput';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {useUserInfoStore} from '@/store/useUserInfo';
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {ResponseType} from '@/types';
import {UpdateProfileRequest, User} from '@/types/user';
import {RW} from '@/utils/DimensionsChange';
import {selectSingleImage} from '@/utils/FileUploader';
import {jsonToForm} from '@/utils/jsonToForm';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import {UserProfileLocation} from '../profileLocation/user';
import {MyProfileStyle} from '../style';
import {Switcher} from '../switcher';

interface IUserFormProps {
  onSwitch: () => void;
  refetch: () => void;
}
const createValidationSchema = (t: (key: string) => string) => {
  return yup.object().shape({
    first_name: yup.string().required(t('MyProfile.Validation.NameRequired')),
    last_name: yup
      .string()
      .required(t('MyProfile.Validation.LastNameRequired')),
    address: yup
      .string()
      .transform(value => (value === '' ? undefined : value))
      .test(
        'minLength',
        t('Validation.AddressMinLength'),
        value => !value || value.length >= 5,
      ),

    zip_code: yup
      .string()
      .min(2, t('MyProfile.Validation.ZipCodeMinLength'))
      .required(t('MyProfile.Validation.ZipCodeRequired')),
    birth_date: yup
      .string()
      .required(t('MyProfile.Validation.BirthDateRequired')),
  });
};
const getDefaultValues = (
  userData: User | null,
): Partial<UpdateProfileRequest> => {
  if (!userData) return {};

  return {
    first_name: userData.profile?.first_name || '',
    last_name: userData.profile?.last_name || '',
    address: userData.profile?.address || '',
    zip_code: userData.profile?.zip_code || '',
    birth_date: userData.profile?.birth_date
      ? userData.profile.birth_date.split('T')[0]
      : '',
  };
};

export function UserForm({refetch}: IUserFormProps) {
  const {t} = useTranslation('UserProfile');
  const {userInfo: userData, setUserInfo} = useUserInfoStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const validationSchema = useMemo(() => createValidationSchema(t), [t]);
  const defaultValues = useMemo(() => getDefaultValues(userData), [userData]);

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isDirty},
    reset,
    watch,
    setValue,
  } = useForm<UpdateProfileRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const {loading, execute} = usePost<ResponseType<User>, FormData>(
    API_URL.User.User,
    {
      onSuccess: res => {
        snackBar(res.message, 'success');
        reset();
        setUserInfo(res.data);
        setSelectedImage(null);
        refetch();
      },
      onError: (errorMessage: string) => {
        snackBar(errorMessage, 'danger');
      },
    },
  );
  const handleFormSubmit = (data: UpdateProfileRequest) => {
    const {first_name, last_name, address, zip_code, birth_date} = data;
    console.log(data);
    const formData = jsonToForm({
      first_name,
      last_name,
      birth_date,
      ...(address?.trim() && {address: address.trim()}),
      ...(zip_code?.trim() && {zip_code: zip_code.trim()}),
    });

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    execute(formData);
  };
  console.log(handleFormSubmit);

  const defaultCountry = userData?.profile?.city?.country
    ? {
        code: userData.profile.city.country.code,
        name: userData.profile.city.country.name,
      }
    : undefined;

  const handleImageSelect = async () => {
    try {
      const image = await selectSingleImage();
      if (image) {
        setSelectedImage(image.uri);
        snackBar(t('MyProfile.ImageSelected'), 'success');
      }
    } catch (error) {
      snackBar(t('MyProfile.ImageSelectionError'), 'danger');
    }
  };
  useEffect(() => {
    setIsFormDirty(isDirty || !!selectedImage);
  }, [isDirty, selectedImage]);

  // console.log(watch('city_id'));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <View style={{gap: 20}}>
          <View
            style={{
              ..._styles.rowCenterSpace,
              width: RW(90),
              position: 'static',
            }}>
            <TouchableOpacity
              style={[
                MyProfileStyle.FileUploader,
                selectedImage || userData.profile.avatar
                  ? {
                      borderColor: colors.secondary[500],
                      borderStyle: 'solid',
                    }
                  : {
                      borderColor: colors.primary[700],
                      borderStyle: 'dashed',
                    },
              ]}
              onPress={handleImageSelect}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={MyProfileStyle.ProfileImage}
                />
              ) : userData?.profile?.avatar ? (
                <Image
                  source={{uri: userData.profile.avatar}}
                  style={MyProfileStyle.ProfileImage}
                />
              ) : (
                <ImageIcon />
              )}
            </TouchableOpacity>
            <Switcher refetch={refetch} />
          </View>
          <View style={MyProfileStyle.RowChild}>
            <CustomTextInput
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors?.first_name?.message}
              placeholderColor="#6D6D6D"
              width={44}
              icon={<EditIcon />}
              placeholder={t('MyProfile.Name')}
              defaultValue={userData?.profile?.first_name}
              onChangeText={text => setValue('first_name', text)}
            />
            <CustomTextInput
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors?.last_name?.message}
              placeholderColor="#6D6D6D"
              width={44}
              icon={<EditIcon />}
              placeholder={t('MyProfile.LastName')}
              defaultValue={userData?.profile?.last_name}
              onChangeText={text => setValue('last_name', text)}
            />
          </View>
          <Email
            email={userData?.email || ''}
            refetchProfileData={refetch}
            emailVerified={!!userData?.profile?.email_verified_at}
          />
          <Phone
            phone={userData?.phone_number || ''}
            refetchProfileData={refetch}
            phoneVerified={!!userData?.profile?.phone_verified_at}
            defaultValue={userData.profile.phone_number || ''}
          />

          <UserProfileLocation
            setValue={setValue}
            watch={watch}
            errors={errors}
            control={control}
            defaultCountry={defaultCountry}
          />

          <UserBirthDate setValue={setValue} watch={watch} />
          <CustomBtn
            width={90}
            title={t('MyProfile.submitButton')}
            radius={8}
            direction="rtl"
            borderWidth={2}
            isLoading={loading}
            // disableClick={!isFormDirty}
            disableBackColor={colors.neutral[400]}
            onClick={handleSubmit(handleFormSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
