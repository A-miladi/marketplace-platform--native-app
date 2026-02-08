import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useFetch} from '@/hooks';
import {API_URL} from '@/constants/api';
import {ICountry} from '@/types/general';
import {UpdateCompanyRequest} from '@/types/user';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {colors} from '@/styles/colors';
import EditIcon from '@/assets/Icons/edit.svg';
import {RH, RW} from '@/utils/DimensionsChange';
import {useTranslation} from 'react-i18next';
import {ResponseType} from '@/types';
import Dropdown from '@/screens/components/common/dropDown';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {snackBar} from '@/utils/snackBar';
import {_styles} from '@/styles/_styles';

interface LocationState {
  isLoading: boolean;
  helperText: string;
  selectedCountry: string | string[];
}

interface ProfileLocationProps {
  errors: FieldErrors<UpdateCompanyRequest>;
  watch: UseFormWatch<UpdateCompanyRequest>;
  setValue: UseFormSetValue<UpdateCompanyRequest>;
  control: Control<UpdateCompanyRequest, any, UpdateCompanyRequest>;
  defaultCountry?: {code: string; name: string};
}

const initialLocationState: LocationState = {
  isLoading: false,
  helperText: '',
  selectedCountry: '',
};

const CompanyProfileLocation: React.FC<ProfileLocationProps> = ({
  errors,
  watch,
  control,
  setValue,
  defaultCountry,
}) => {
  const {t} = useTranslation('UserProfile.MyProfile');
  const zipCode = watch('zip_code');

  const [state, setState] = useState<LocationState>(() => ({
    ...initialLocationState,
    selectedCountry: defaultCountry?.code || '',
  }));

  const {data: countryList, refetch: refetchCountry} = useFetch<
    ResponseType<ICountry[]>
  >(API_URL.General.country, {autoFetch: false});

  useEffect(() => {
    if (!countryList?.data) {
      refetchCountry();
    }
  }, [countryList?.data, refetchCountry]);

  const updateState = useCallback((newState: Partial<LocationState>) => {
    setState(prev => ({...prev, ...newState}));
  }, []);

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

      setValue('city_id', null as unknown as number, {
        shouldValidate: true,
        shouldDirty: true,
      });

      const baseAddress = `${country}, ${stateFromZip}, ${cityFromZip}`;
      setValue('address', baseAddress, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      snackBar(t('LocationError'), 'danger');
      updateState({
        helperText: t('LocationError'),
      });
    } finally {
      updateState({isLoading: false});
    }
  }, [state.selectedCountry, setValue, updateState, t, zipCode]);

  const handleCountryChange = useCallback(
    (value: string | string[]) => {
      const countryValue = Array.isArray(value) ? value[0] : value;
      updateState({selectedCountry: countryValue});
      if (zipCode) {
        handleLocationData();
        updateState({helperText: ''});
      }
    },
    [updateState, zipCode, handleLocationData],
  );

  useEffect(() => {
    if (zipCode && state.selectedCountry) {
      handleLocationData();
      updateState({helperText: ''});
    } else if (zipCode && !state.selectedCountry) {
      updateState({
        helperText: t('SelectCountryHelper'),
      });
    }
  }, [zipCode, state.selectedCountry, handleLocationData, updateState, t]);

  const countryOptions =
    countryList?.data.map((country, idx) => ({
      key: idx,
      value: country.code,
      label: country.name,
    })) || [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{..._styles.rowCenterSpace}}>
          <Dropdown
            style={{width: RW(30)}}
            options={countryOptions}
            onSelect={handleCountryChange}
            selectedValue={state.selectedCountry}
            placeholder={t('SelectCountry')}
            defaultValue={defaultCountry?.name}
          />
          <Controller
            control={control}
            name="zip_code"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                placeholder={t('MyProfile.zipCode')}
                width={57}
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
        </View>
      </View>

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

      {state.isLoading && (
        <ActivityIndicator size="small" color={colors.primary[800]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {gap: 15},
  row: {
    justifyContent: 'space-between',
  },

  zipInput: {
    flex: 0.48,
  },
  addressInput: {
    marginBottom: RH(2),
  },
  label: {
    fontSize: 14,
    color: colors.neutral[900],
    marginBottom: RH(1),
    fontWeight: '500',
  },
});

export default CompanyProfileLocation;
