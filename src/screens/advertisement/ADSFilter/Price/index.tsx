import {CustomTextInput} from '@/screens/components/common/TextInput';
import {colors} from '@/styles/colors';
import {IFilters} from '@/types/general';
import {addCommas} from '@/utils/AddComma';
import React, {useEffect, useState} from 'react';
import {UseFormSetValue, UseFormWatch} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

interface PriceFilterProps {
  watch: UseFormWatch<IFilters>;
  setValue: UseFormSetValue<IFilters>;
}

const PriceFilter = ({setValue, watch}: PriceFilterProps) => {
  const [formattedMinPrice, setFormattedMinPrice] = useState<string>('');
  const [formattedMaxPrice, setFormattedMaxPrice] = useState<string>('');

  const priceMin = watch('price_min');
  const priceMax = watch('price_max');

  // Sync the local state with form value for minimum price
  useEffect(() => {
    if (priceMin === null || priceMin === undefined || priceMin === 0) {
      setFormattedMinPrice('');
    } else {
      setFormattedMinPrice(addCommas(String(priceMin)));
    }
  }, [priceMin]);
  useEffect(() => {
    if (priceMax === null || priceMax === undefined || priceMax === 0) {
      setFormattedMaxPrice('');
    } else {
      setFormattedMaxPrice(addCommas(String(priceMax)));
    }
  }, [priceMax]);

  const handleMinPriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedValue = addCommas(numericValue);
    setFormattedMinPrice(formattedValue);
    const rawValue = formattedValue.replace(/,/g, '');
    setValue('price_min', Number(rawValue) || null);
  };

  const handleMaxPriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedValue = addCommas(numericValue);
    setFormattedMaxPrice(formattedValue);
    const rawValue = formattedValue.replace(/,/g, '');
    setValue('price_max', Number(rawValue) || null);
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Min Price"
        width={45}
        height={4}
        placeholderColor={colors.neutral[600]}
        value={formattedMinPrice}
        onChangeText={handleMinPriceChange}
      />
      <CustomTextInput
        placeholder="Max Price"
        placeholderColor={colors.neutral[600]}
        width={45}
        height={4}
        value={formattedMaxPrice}
        onChangeText={handleMaxPriceChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});

export default PriceFilter;
