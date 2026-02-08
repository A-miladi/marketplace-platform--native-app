import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import Dropdown from '@/screens/components/common/dropDown';
import {colors} from '@/styles/colors';
import {ResponseWithPaginationType} from '@/types';
import {AdvertisementFormData} from '@/types/advertisement';
import {ICategory} from '@/types/category';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Text, View} from 'react-native';

interface CategoryFormProps {
  control: Control<AdvertisementFormData>;
  errors: FieldErrors<AdvertisementFormData>;
}
export const CategoryForm = ({control, errors}: CategoryFormProps) => {
  const {data: categoryList, refetch} = useFetch<
    ResponseWithPaginationType<ICategory[]>
  >(`${API_URL.Category.Category}`);

  const categoryOptions =
    categoryList?.data.map(category => ({
      label: category.name,
      value: category.id.toString(),
    })) || [];
  return (
    <View
      style={{
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[100],
        paddingBottom: 20,
      }}>
      <Text style={{paddingLeft: 1}}>Category</Text>
      <Controller
        name="category_id"
        control={control}
        rules={{required: 'Category is required'}}
        render={({field}) => (
          <Dropdown
            refetch={() => refetch()}
            height={200}
            {...field}
            options={categoryOptions}
            onSelect={(value: string | string[]) => {
              field.onChange(parseInt(value as string, 10));
            }}
            selectedValue={field.value ? field.value.toString() : ''}
            placeholder="Choose your category"
            error={!!errors.category_id}
            helperText={errors.category_id?.message}
            isSearch
          />
        )}
      />
    </View>
  );
};
