import EditIcon from '@/assets/Icons/edit.svg';
import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import Dropdown from '@/screens/components/common/dropDown';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {ResponseType} from '@/types';
import {ICountry} from '@/types/general';
import {UpdateProfileRequest} from '@/types/user';
import {snackBar} from '@/utils/snackBar';
import {useCallback, useEffect, useState} from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

interface LocationState {
  isLoading: boolean;
  helperText: string;
  selectedCountry: string | string[];
}

interface ProfileLocationProps {
  control: Control<UpdateProfileRequest>;
  errors: FieldErrors<UpdateProfileRequest>;
  watch: UseFormWatch<UpdateProfileRequest>;
  setValue: UseFormSetValue<UpdateProfileRequest>;
  defaultCountry?: {code: string; name: string};
}

const initialLocationState: LocationState = {
  isLoading: false,
  helperText: '',
  selectedCountry: '',
};

export const UserProfileLocation = ({
  control,
  errors,
  watch,
  setValue,
  defaultCountry,
}: ProfileLocationProps) => {
  const {t} = useTranslation('UserProfile');
  const zipCode = watch('zip_code');

  const [state, setState] = useState<LocationState>(() => ({
    ...initialLocationState,
    selectedCountry: defaultCountry?.code || '',
  }));

  const {data: countryList, refetch: refetchCountry} = useFetch<
    ResponseType<ICountry[]>
  >(API_URL.General.country, {autoFetch: false});

  const updateState = useCallback((newState: Partial<LocationState>) => {
    setState(prev => ({...prev, ...newState}));
  }, []);

  // Set initial country when countryList is loaded and defaultCountry is provided
  useEffect(() => {
    if (countryList?.data && defaultCountry?.code) {
      const country = countryList.data.find(
        country => country.code === defaultCountry.code,
      );
      if (country) {
        updateState({
          selectedCountry: country.code,
        });
      }
    }
  }, [countryList?.data, defaultCountry?.code, updateState]);

  const handleLocationData = useCallback(async () => {
    if (!zipCode || zipCode.length < 5 || !state.selectedCountry) return;

    updateState({
      isLoading: true,
      helperText: '',
    });

    try {
      interface ZipResponse {
        places: Array<{
          'place name': string;
          state: string;
        }>;
        country: string;
      }

      const response = await fetch(
        `https://api.zippopotam.us/${state.selectedCountry}/${zipCode}`,
      );

      if (!response.ok) {
        throw new Error('Invalid ZIP code or no data found');
      }

      const data: ZipResponse = await response.json();
      const cityFromZip = data.places[0]['place name'];
      const stateFromZip = data.places[0].state;
      const country = data.country;

      // setValue('city_id', null as unknown as number, {
      //   shouldValidate: true,
      //   shouldDirty: true,
      // });

      const baseAddress = `${country}, ${stateFromZip}, ${cityFromZip}`;
      setValue('address', baseAddress, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      snackBar(t('MyProfile.LocationError'), 'danger');
      updateState({
        helperText: t('MyProfile.LocationError'),
      });
      // Set empty string for address when there's an error
      setValue('address', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      return error;
    } finally {
      updateState({isLoading: false});
    }
  }, [state.selectedCountry, setValue, updateState, t, zipCode]);

  // Fetch country list on mount
  useEffect(() => {
    refetchCountry();
  }, [refetchCountry]);

  // Handle country change
  const handleCountryChange = useCallback(
    (value: string | string[]) => {
      updateState({
        selectedCountry: value,
      });
    },
    [updateState],
  );

  // Handle zip code changes
  useEffect(() => {
    if (zipCode && state.selectedCountry) {
      handleLocationData();
      updateState({helperText: ''});
    } else if (zipCode && !state.selectedCountry) {
      updateState({
        helperText: t('MyProfile.SelectCountryHelper'),
      });
    }
  }, [zipCode, state.selectedCountry, handleLocationData, updateState, t]);

  const countryOptions =
    countryList?.data.map(country => ({
      value: country.code,
      label: country.name,
    })) || [];

  return (
    <View style={{gap: 20}}>
      <Dropdown
        options={countryOptions}
        onSelect={handleCountryChange}
        selectedValue={state.selectedCountry as string}
        placeholder={t('MyProfile.SelectCountry')}
        defaultValue={defaultCountry?.name}
      />

      <Controller
        control={control}
        name="zip_code"
        render={({field: {onChange, onBlur, value}}) => (
          <CustomTextInput
            placeholder={t('MyProfile.zipCode')}
            width={90}
            placeholderColor="#6D6D6D"
            icon={<EditIcon />}
            helperText={errors?.zip_code?.message || state.helperText}
            error={!!errors.zip_code}
            value={value}
            onChangeText={text => {
              onChange(text);
              setValue('zip_code', text, {shouldValidate: true});
            }}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({field: {value}}) => (
          <CustomTextInput
            readonly
            placeholder={t('MyProfile.Address')}
            width={90}
            placeholderColor="#6D6D6D"
            icon={<EditIcon />}
            helperText={errors?.address?.message}
            error={!!errors.address}
            value={value}
          />
        )}
      />
    </View>
  );
};
