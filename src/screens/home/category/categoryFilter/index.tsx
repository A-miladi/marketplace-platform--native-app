import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {ICategory} from '@/types/category';
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FCStyle} from './FilterStyle';
import {colors} from '@/styles/colors';

export const FilterCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const {data} = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Public.category}`,
  );

  return (
    <>
      {data?.data.map((category, idx) => (
        <TouchableOpacity
          onPress={() =>
            setSelectedCategory(
              selectedCategory === category.id ? null : category.id,
            )
          }
          key={idx}
          style={[FCStyle.buttons]}>
          <Text
            style={[
              FCStyle.buttonText,
              selectedCategory === category.id && {color: colors.primary[800]},
            ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};
