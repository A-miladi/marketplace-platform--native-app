import {API_URL} from '@/constants/api';
import {useFetch, usePost} from '@/hooks';
import {colors} from '@/styles/colors';
import {ResponseType, ResponseWithPaginationType} from '@/types';
import {
  AdvertisementFormData,
  IAdvertisement,
  LocationLatLng,
} from '@/types/advertisement';
import {User} from '@/types/user';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import CustomBtn from '../components/common/button/Button';
import {CheckBox} from '../components/common/checkBox';
import SpinnerLoading from '../components/common/spinner';
import {TextArea} from '../components/common/TextArea';
import {CustomTextInput} from '../components/common/TextInput';
import {CategoryForm} from './categoryForm';
import {CategoryPropertiesForm} from './forms/categoryPropertiesForm';
import LocationForm from './locationForm';
import PriceInput from './price';
import {SellStyle} from './SellOnStyle';
import {PhotoUploader} from './uploader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  SingleAds: {id: number};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const schema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Advertisement title is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .max(Number.MAX_SAFE_INTEGER, 'Price is too high')
    .required('Price is required'),
  description: yup
    .string()
    .min(5, 'Description must be at least 5 characters long')
    .max(250, 'Description cannot exceed 250 characters')
    .required('Description is required'),
  category_id: yup.number().required('Category is required'),
  city_id: yup.number().required('City is required'),
  zip_code: yup
    .string()
    .required('Zip code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'),
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long')
    .max(100, 'Address cannot exceed 100 characters'),
});

export default function SellOnUA() {
  const {t} = useTranslation('SellOnUniq');
  const [showPhone, setShowPhone] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const {data: userData, loading: userDataLoading} = useFetch<
    ResponseWithPaginationType<User>
  >(API_URL.User.User);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    trigger,
    formState,
  } = useForm<AdvertisementFormData>({
    resolver: yupResolver(schema),
  });
  const [location, setLocation] = useState<LocationLatLng | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'EURO'>('USD');
  const [formattedPrice, setFormattedPrice] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const categoryId = watch('category_id');

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
      setValue('properties', []);
    }
  }, [categoryId, setValue]);

  const {loading, execute} = usePost<ResponseType<IAdvertisement>, FormData>(
    API_URL.User.Ad,
    {
      onSuccess: data => {
        reset();
        snackBar(data.message, 'success');
        setLocation(null);
        navigation.navigate('SingleAds', {id: data.data.id});
      },
      onError: error => {
        snackBar(error, 'danger');
      },
    },
  );
  const onSubmit = (data: AdvertisementFormData) => {
    const fixedData = {
      ...data,
      price: Math.floor(Number(data.price)),
      currency,
      show_phone: showPhone,
      properties: Array.isArray(data.properties)
        ? data.properties
            .map((value, index) => ({
              property_definition_id: index,
              value: Array.isArray(value) ? value : String(value || ''),
            }))
            .filter(
              prop =>
                prop.value !== '' &&
                prop.value !== 'null' &&
                prop.value !== null &&
                (!Array.isArray(prop.value) || prop.value.length > 0),
            )
        : Object.entries(data.properties || {})
            .map(([id, value]) => ({
              property_definition_id: Number(id.split('.')[1]),
              value: Array.isArray(value) ? value : String(value || ''),
            }))
            .filter(
              prop =>
                prop.value !== '' &&
                prop.value !== 'null' &&
                prop.value !== null &&
                (!Array.isArray(prop.value) || prop.value.length > 0),
            ),
    };

    const formData = new FormData();

    formData.append('title', fixedData.title);
    formData.append('description', fixedData.description);
    formData.append('price', String(fixedData.price));
    formData.append('currency', fixedData.currency);
    formData.append('category_id', String(fixedData.category_id));
    formData.append('city_id', String(fixedData.city_id));
    formData.append('show_phone', String(fixedData.show_phone));
    formData.append('zip_code', fixedData.zip_code);
    formData.append('address', fixedData.address);

    if (location) {
      formData.append(
        'location',
        JSON.stringify({
          lat: location.lat,
          lng: location.lng,
        }),
      );
    }

    if (fixedData.properties && fixedData.properties.length > 0) {
      formData.append('properties', JSON.stringify(fixedData.properties));
    }

    imagePreviews.forEach((uri, index) => {
      const filename =
        uri.split('/').pop() || `image_${Date.now()}_${index}.jpg`;
      const filetype = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';

      formData.append('images', {
        uri: uri,
        name: filename,
        type: filetype,
      } as any);
    });

    execute(formData);
  };

  const getVerificationMessage = () => {
    if (!userData?.data?.profile.email_verified_at) return 'email';
    if (!userData?.data?.profile.phone_verified_at) return 'phone number';
    if (userData?.data?.profile.status === 'PENDING')
      return 'email and phone number';
    return null;
  };

  const verificationMessage = getVerificationMessage();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}>
      <ScrollView>
        <SpinnerLoading visible={userDataLoading} />
        <View style={SellStyle.container}>
          <Text style={SellStyle.title}>
            {t('AdvertisementRegistrationForm.AdvertisementRegistration')}
          </Text>
          <PhotoUploader
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            onImagesChange={handleImagesChange}
          />

          <Controller
            control={control}
            name="title"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <CustomTextInput
                label="Advertisement title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your ad title"
                placeholderColor={colors.neutral[500]}
                style={{
                  marginVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.neutral[100],
                  paddingBottom: 20,
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <CategoryForm control={control} errors={formState.errors} />
          {selectedCategoryId && (
            <CategoryPropertiesForm
              categoryId={selectedCategoryId}
              control={control}
              errors={formState.errors}
            />
          )}
          <View
            style={{
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.neutral[100],
            }}>
            <LocationForm
              watch={watch}
              location={location}
              setLocation={setLocation}
              errors={formState.errors}
              setValue={setValue}
              trigger={trigger}
            />

            <Controller
              control={control}
              name="zip_code"
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <CustomTextInput
                  placeholder="Enter zip code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderColor={colors.neutral[500]}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <CustomTextInput
                  placeholder="Enter your address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderColor={colors.neutral[500]}
                  style={{marginTop: 15}}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </View>

          <PriceInput
            currency={currency}
            setCurrency={setCurrency}
            formattedPrice={formattedPrice}
            setFormattedPrice={setFormattedPrice}
            setValue={setValue}
            trigger={trigger}
            errors={formState.errors}
          />

          <Controller
            control={control}
            name="description"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextArea
                label="Description"
                width={90}
                Radius={8}
                style={{
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.neutral[100],
                  paddingBottom: 15,
                }}
                value={value}
                onChange={onChange}
                placeholder="Enter your description of the device"
                helperText={formState.errors.description?.message}
              />
            )}
          />
          <View style={SellStyle.checkbox}>
            <CheckBox
              onPress={() => setShowPhone(!showPhone)}
              isChecked={!showPhone}
              title={t('ToggleForm.title')}
              width={80}
            />
          </View>

          <View style={SellStyle.ButtonBox}>
            <CustomBtn
              width={90}
              title={t('RegisterButtons.RegisterAnAd')}
              radius={8}
              height={5}
              direction="rtl"
              onClick={handleSubmit(onSubmit)}
              isLoading={loading}
            />
            <CustomBtn
              width={90}
              title={t('RegisterButtons.Cancellation')}
              radius={8}
              height={5}
              direction="rtl"
              backColor="white"
              borderWidth={1}
              borderColor={colors.primary[800]}
              titleColor={colors.primary[800]}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
