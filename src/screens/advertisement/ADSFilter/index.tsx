import {Collapse} from '@/screens/components/common/collapse';
import {IFilters} from '@/types/general';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import CustomBtn from '@/screens/components/common/button/Button';
import {useFilterStore} from '@/store/useFilters';
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {cleanObject} from '@/utils/cleanObject';
import DateFilter from './Date';
import PriceFilter from './Price';
import Dropdown from '@/screens/components/common/dropDown';
import {sortOptions} from '@/constants/SortOption';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {ICategory} from '@/types/category';
import {API_URL} from '@/constants/api';

const filterSchema = yup.object().shape({
  date_from: yup.date().nullable(),
  date_to: yup.date().nullable(),
  price_min: yup
    .number()
    .typeError('Price must be a number')
    .max(Number.MAX_SAFE_INTEGER, 'Price is too high')
    .nullable(),
  price_max: yup
    .number()
    .typeError('Price must be a number')
    .max(Number.MAX_SAFE_INTEGER, 'Price is too high')
    .nullable(),
});

interface ADSFilterProps {
  onClose: () => void;
}

export const ADSFilter = ({onClose}: ADSFilterProps) => {
  const {setFilters, resetFilters, filters} = useFilterStore();
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const {data: categoryList} = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Category.Category}`,
  );
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {isLoading},
    control,
  } = useForm<IFilters>({
    defaultValues: {
      date_from: filters.date_from || null,
      date_to: filters.date_to || null,
      price_min: filters.price_min || null,
      price_max: filters.price_max || null,
      sort: filters.sort || 'DATE_DESC',
      category_ids: filters.category_ids || '',
      properties: filters.properties,
    },
  });

  const handleToggle = (index: number) => {
    setIsOpen(prevIndex => (prevIndex === index ? null : index));
  };

  const onSubmit = handleSubmit((data: IFilters) => {
    const cleanedData = cleanObject<IFilters>(data);
    setFilters(cleanedData);
    onClose();
  });

  const onCancelClick = () => {
    reset();
    onClose();
    resetFilters();
  };

  const filterSections = [
    {
      title: 'Date',
      content: <DateFilter setValue={setValue} watch={watch} />,
    },
    {
      title: 'Price',
      content: (
        <View style={styles.priceContainer}>
          <View style={styles.priceLabels}>
            <Text style={styles.priceLabel}>At least</Text>
            <View style={styles.dashedLine} />
            <Text style={styles.priceLabel}>Maximum</Text>
          </View>
          <PriceFilter watch={watch} setValue={setValue} />
        </View>
      ),
    },
  ];

  return (
    <View style={{gap: 4}}>
      <Dropdown
        buttonStyle={{
          paddingHorizontal: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral[50],
        }}
        options={
          categoryList?.data.map(category => ({
            value: category.id.toString(),
            label: category.name,
          })) || []
        }
        selectedValue={watch('category_ids') || ''}
        onSelect={value => setValue('category_ids', value as string)}
        placeholder="Select category"
        placeholderColor={colors.neutral[950]}
        isSearch
        style={{width: '100%'}}
        height={200}
      />
      <Dropdown
        buttonStyle={{
          paddingHorizontal: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral[50],
        }}
        options={sortOptions}
        selectedValue={watch('sort') || 'DATE_DESC'}
        onSelect={value => setValue('sort', value as string)}
        placeholder="Sort by"
        style={{width: '100%'}}
        height={200}
      />
      {filterSections.map((section, index) => (
        <Collapse
          key={index}
          isOpen={isOpen === index}
          toggleCollapse={() => handleToggle(index)}
          title={section.title}>
          {section.content}
        </Collapse>
      ))}
      <View style={styles.actionButton}>
        <CustomBtn
          width={30}
          title="Reset"
          radius={8}
          height={4}
          direction="rtl"
          backColor="white"
          borderWidth={2}
          borderColor={colors.primary[800]}
          titleColor={colors.primary[800]}
          onClick={onCancelClick}
        />
        <CustomBtn
          width={30}
          title="Apply filter"
          radius={8}
          height={4}
          direction="rtl"
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabels: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#262626',
  },
  dashedLine: {
    height: 40,
    width: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    ..._styles.rowCenterSpace,
    marginTop: 20,
  },
});
