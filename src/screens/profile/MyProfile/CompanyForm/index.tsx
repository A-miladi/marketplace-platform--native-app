import ImageIcon from '@/assets/Icons/AddImage.svg';
import EditIcon from '@/assets/Icons/edit.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import CustomBtn from '@/screens/components/common/button/Button';
import {CheckBox} from '@/screens/components/common/checkBox';
import {Email} from '@/screens/components/common/emailInput';
import {Phone} from '@/screens/components/common/phoneInput';
import {PurchaseSchedule} from '@/screens/components/common/purchaseSchedule';
import RadioButton from '@/screens/components/common/RadioButton';
import {TextArea} from '@/screens/components/common/TextArea';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {useUserInfoStore} from '@/store/useUserInfo';
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {ResponseType} from '@/types';
import {CompanyProfile, UpdateCompanyRequest, User} from '@/types/user';
import {RW} from '@/utils/DimensionsChange';
import {selectSingleImage} from '@/utils/FileUploader';
import {jsonToForm} from '@/utils/jsonToForm';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import CompanyProfileLocation from '../profileLocation/company';
import {MyProfileStyle} from '../style';
interface CompanyFormProps {
  refetch: () => void;
}

interface ExtraData {
  hear_about_us?: string;
  brand_priority?: string;
  budget?: string;
  equipment_type?: string;
  suggestions?: string;
  purchase_schedule?: string;
}
const getDefaultValues = (
  userData: User | null,
): Partial<UpdateCompanyRequest> => {
  if (!userData) return {};

  const profile = userData.profile as CompanyProfile;
  let extraData: ExtraData = {};

  try {
    if (typeof profile?.extra_data === 'string') {
      extraData = JSON.parse(profile.extra_data);
    } else {
      extraData = profile?.extra_data || {};
    }
  } catch (error) {
    console.error('Error parsing extra_data:', error);
    extraData = {};
  }

  return {
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    address: profile?.address || '',
    zip_code: profile?.zip_code || '',
    city_id: profile?.city_id ? Number(profile.city_id) : undefined,
    company_name: profile?.company_name || '',
    is_email_subscribed: profile?.is_email_subscribed || false,
    side: profile?.side || 'BOTH',
    role: profile?.role || '',
    extra_data: {
      hear_about_us: extraData.hear_about_us || '',
      brand_priority: extraData.brand_priority || '',
      budget: extraData.budget || '',
      equipment_type: extraData.equipment_type || '',
      suggestions: extraData.suggestions || '',
      purchase_schedule: extraData.purchase_schedule || '',
    },
  };
};
export const CompanyForm = ({refetch}: CompanyFormProps) => {
  const {t} = useTranslation('UserProfile');
  const {userInfo: userData, setUserInfo} = useUserInfoStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selected, setSelected] = useState(false);

  const handleLanguageSelect = () => {
    setSelected(!selected);
  };
  const defaultCountry = userData?.profile?.city?.country
    ? {
        code: userData.profile.city.country.code,
        name: userData.profile.city.country.name,
      }
    : undefined;
  const createValidationSchema = () => {
    return yup.object().shape({
      first_name: yup.string().required(t('Validation.NameRequired')),
      last_name: yup.string().required(t('Validation.LastNameRequired')),
      address: yup.string().min(5, t('Validation.AddressMinLength')),
      zip_code: yup
        .string()
        .required(t('Validation.ZipCodeRequired'))
        .min(2, t('Validation.ZipCodeMinLength')),
      city_id: yup.number().nullable(),
      role: yup.string().required(t('Validation.JobTitleRequired')),
      company_name: yup.string().required(t('Validation.CompanyNameRequired')),
      side: yup
        .string()
        .oneOf(['BUYER', 'SELLER', 'BOTH'])
        .required(t('Validation.SideRequired')),
      is_email_subscribed: yup.boolean(),
      extra_data: yup
        .object()
        .shape({
          hear_about_us: yup.string().nullable(),
          brand_priority: yup.string().nullable(),
          budget: yup.string().nullable(),
          equipment_type: yup.string().nullable(),
          suggestions: yup.string().nullable(),
          purchase_schedule: yup.string().nullable(),
        })
        .nullable(),
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: {errors, isDirty},
  } = useForm<UpdateCompanyRequest>({
    resolver: yupResolver(createValidationSchema()) as any,
    defaultValues: getDefaultValues(userData),
  });
  const [isFormDirty, setIsFormDirty] = useState(false);
  useEffect(() => {
    setIsFormDirty(isDirty || !!selectedImage);
  }, [isDirty, selectedImage]);

  useEffect(() => {
    if (userData?.profile?.city_id) {
      setSelectedCityId(Number(userData.profile.city_id));
    }
  }, [userData.profile.city_id]);

  const {loading, execute} = usePost<ResponseType<User>, FormData>(
    API_URL.User.Company,
    {
      onSuccess: res => {
        snackBar(res.message, 'success');
        setUserInfo(res.data);
        setSelectedImage(null);
        refetch();
      },
      onError: error => {
        snackBar(error, 'danger');
      },
    },
  );

  const handleImageSelect = async () => {
    try {
      const image = await selectSingleImage();
      if (image) {
        setSelectedImage(image.uri as any);
        snackBar(t('MyProfile.ImageSelected'), 'success');
      }
    } catch (error) {
      snackBar(t('MyProfile.ImageSelectionError'), 'danger');
    }
  };
  useEffect(() => {
    setIsFormDirty(isDirty || !!selectedImage);
  }, [isDirty, selectedImage]);

  const onSubmit = (data: UpdateCompanyRequest) => {
    const formData = jsonToForm({
      ...data,
      city_id: selectedCityId || data.city_id,
    });

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    execute(formData);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <ScrollView>
        <View
          style={{
            gap: 15,
            paddingBottom: 20,
          }}>
          <View
            style={{
              ..._styles.rowCenterSpace,
              width: RW(90),
              position: 'static',
            }}>
            <TouchableOpacity
              style={[
                MyProfileStyle.FileUploader,
                !selectedImage && {
                  borderColor: colors.secondary[500],
                  borderStyle: 'solid',
                },
              ]}
              onPress={handleImageSelect}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage as any}}
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
          <CustomTextInput
            {...register('role')}
            placeholder={t('Job title')}
            error={!!errors.role}
            helperText={errors.role?.message}
          />
          <CustomTextInput
            {...register('company_name')}
            placeholder={t('CompanyName')}
            error={!!errors.company_name}
            helperText={errors.company_name?.message}
            defaultValue={userData?.profile?.company_name}
            onChangeText={text => setValue('company_name', text)}
          />
          <RadioButton
            register={register}
            errors={errors}
            control={control}
            defaultSide={userData?.profile?.side}
          />
          <Email
            email={userData?.email || ''}
            refetchProfileData={refetch}
            emailVerified={!!userData?.profile?.email_verified_at}
          />
          <Phone
            phone={userData?.phone_number || ''}
            refetchProfileData={refetch}
            phoneVerified={!!userData?.profile?.phone_verified_at}
          />

          <CompanyProfileLocation
            setValue={setValue}
            watch={watch}
            errors={errors}
            control={control}
            defaultCountry={defaultCountry}
          />
          <Controller
            control={control}
            name="extra_data.hear_about_us"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.extra_data?.hear_about_us}
                helperText={errors.extra_data?.hear_about_us?.message}
                placeholder={t('MyProfile.CompanyForm.HowDidYouHearAboutUs')}
                placeholderColor="#6D6D6D"
                width={90}
                icon={<EditIcon />}
              />
            )}
          />
          <Controller
            control={control}
            name="extra_data.brand_priority"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.extra_data?.brand_priority}
                helperText={errors.extra_data?.brand_priority?.message}
                placeholder={t('MyProfile.CompanyForm.BrandPriority')}
                placeholderColor="#6D6D6D"
                width={90}
                icon={<EditIcon />}
              />
            )}
          />
          <Controller
            control={control}
            name="extra_data.budget"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.extra_data?.budget}
                helperText={errors.extra_data?.budget?.message}
                placeholder={t('MyProfile.CompanyForm.Budget')}
                placeholderColor="#6D6D6D"
                width={90}
                icon={<EditIcon />}
              />
            )}
          />
          <Controller
            control={control}
            name="extra_data.equipment_type"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.extra_data?.equipment_type}
                helperText={errors.extra_data?.equipment_type?.message}
                placeholder={t('MyProfile.CompanyForm.EquipmentType')}
                placeholderColor="#6D6D6D"
                width={90}
                icon={<EditIcon />}
              />
            )}
          />
          <PurchaseSchedule
            setValue={setValue}
            watch={watch}
            error={!!errors.extra_data?.purchase_schedule}
            helperText={errors.extra_data?.purchase_schedule?.message}
          />
          <CheckBox
            isChecked={selected}
            onPress={() => handleLanguageSelect()}
            title=" I would like to receive newsletters"
          />
          <Controller
            control={control}
            name="extra_data.suggestions"
            render={({field: {onChange, onBlur, value}}) => (
              <TextArea
                value={value}
                onChange={onChange}
                placeholder={t('MyProfile.CompanyForm.Suggestions')}
                helperText={errors.extra_data?.suggestions?.message}
                width={90}
              />
            )}
          />
          <CustomBtn
            width={90}
            title={t('MyProfile.submitButton')}
            radius={8}
            direction="rtl"
            borderWidth={2}
            onClick={handleSubmit(onSubmit)}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
