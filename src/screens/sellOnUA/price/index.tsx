import {CURRENCY_OPTIONS} from '@/constants/currency';
import Dropdown from '@/screens/components/common/dropDown';
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {AdvertisementFormData} from '@/types/advertisement';
import {RH, RW} from '@/utils/DimensionsChange';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {UseFormSetValue, UseFormTrigger} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface PriceInputProps {
  currency: 'USD' | 'EURO';
  setCurrency: (value: 'USD' | 'EURO') => void;
  formattedPrice: string;
  setFormattedPrice: (value: string) => void;
  setValue: UseFormSetValue<AdvertisementFormData>;
  trigger?: UseFormTrigger<AdvertisementFormData>;
  errors?: {
    price?: {
      message?: string;
    };
  };
}

export const PriceInput = ({
  currency,
  setCurrency,
  formattedPrice,
  setFormattedPrice,
  setValue,
  trigger,
  errors,
}: PriceInputProps) => {
  const theme = useTheme();

  const addCommas = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedValue = addCommas(numericValue);
    setFormattedPrice(formattedValue);
    const rawValue = formattedValue.replace(/,/g, '');

    if (rawValue === '' || !isNaN(Number(rawValue))) {
      setValue('price', Number(rawValue) || 0);
      if (trigger) {
        trigger('price');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price</Text>

      <View style={styles.inputContainer}>
        <View style={styles.currencySelector}>
          <Dropdown
            buttonStyle={[
              styles.dropdownButton,
              errors?.price && {borderColor: 'red'},
            ]}
            options={CURRENCY_OPTIONS}
            onSelect={selectedItem =>
              setCurrency(selectedItem as 'USD' | 'EURO')
            }
            selectedValue={currency}
          />
        </View>
        <View style={[styles.priceInput, errors?.price && styles.errorBorder]}>
          <Text style={styles.currencyPrefix}>
            {currency === 'USD' ? '$ ' : '€ '}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the price of your device"
            value={formattedPrice}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            placeholderTextColor={colors.neutral[400]}
          />
          {errors?.price && (
            <Text style={styles.errorText}>{errors.price.message}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 10,
    color: colors.neutral[900],
  },
  inputContainer: {
    ..._styles.rowCenter,
    width: RW(90),
  },
  currencySelector: {
    width: '25%',
  },
  priceInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    position: 'relative',
  },
  dropdownButton: {
    width: '25%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 8,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownButtonText: {
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown: {
    borderRadius: 8,
    marginTop: -30,
  },
  dropdownRow: {
    height: 50,
  },
  dropdownRowText: {
    fontSize: 14,
    textAlign: 'left',
  },
  currencyPrefix: {
    fontSize: 14,
    marginRight: 4,
    color: colors.neutral[800],
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    position: 'absolute',
    fontSize: 12,
    bottom: '85%',
    backgroundColor: 'white',
    left: 10,
  },
});

export default PriceInput;
