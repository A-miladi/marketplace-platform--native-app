import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {FormContainer, FormInputs} from '@/screens/components/Form';
import {ResponseType} from '@/types';
import {ICategory} from '@/types/category';
import {IInput} from '@/types/forms';
import {useEffect} from 'react';
import {Control} from 'react-hook-form';
import {Text, View} from 'react-native';

interface CategoryPropertiesFormProps {
  categoryId: number | null;
  control: Control<any>;
  errors: any;
  existingProperties?: Record<number, string | number>;
}

export const CategoryPropertiesForm = ({
  categoryId,
  control,
  errors,
  existingProperties,
}: CategoryPropertiesFormProps) => {
  const {data: categoryData, refetch} = useFetch<ResponseType<ICategory>>(
    categoryId ? `${API_URL.Category.Category}/${categoryId}` : '',
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (categoryId) {
      refetch();
    }
  }, [categoryId, refetch]);

  if (!categoryData?.data?.properties) return null;

  const inputs: IInput[] = categoryData.data.properties.map(property => ({
    type: property.type,
    name: `properties.${property.id}`,
    label: property.name,
    placeholder: `Enter ${property.name.toLowerCase()}`,
    is_required: property.is_required,
    validation: property.validation || undefined,
    options: property.validation?.enum?.map(option => ({
      label: option,
      value: option,
    })),
    control,
    className: 'h-10 md:h-12 bg-white text-sm font-normal',
    defaultValue: existingProperties?.[property.id] || undefined,
  }));
  return (
    <View style={{paddingVertical: 10}}>
      <FormContainer errors={errors}>
        <FormInputs inputs={inputs} control={control} />
      </FormContainer>
    </View>
  );
};
