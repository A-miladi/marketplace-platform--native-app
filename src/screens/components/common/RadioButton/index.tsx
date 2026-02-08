import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {UpdateCompanyRequest} from '@/types/user';
import {RFS} from '@/utils/DimensionsChange';
import React from 'react';
import {Control, FieldErrors, UseFormRegister, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type userType = 'BUYER' | 'SELLER' | 'BOTH';
interface RadioButtonProps {
  register: UseFormRegister<UpdateCompanyRequest>;
  errors: FieldErrors<UpdateCompanyRequest>;
  defaultSide?: userType;
  control: Control<UpdateCompanyRequest>;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  register,
  errors,
  defaultSide,
  control,
}) => {
  const {t} = useTranslation('UserProfile.MyProfile.CompanyForm');
  const currentValue = useWatch({
    control,
    name: 'side',
    defaultValue: defaultSide,
  });

  const options = [
    {label: t('Buyer'), value: 'BUYER'},
    {label: t('Seller'), value: 'SELLER'},
    {label: t('Both'), value: 'BOTH'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sideLabel}>{t('User Type')}:</Text>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioOption}
            onPress={() => register('side').onChange(option.value as any)}>
            <View style={styles.outerCircle}>
              {currentValue === option.value && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.side && (
        <Text style={styles.errorText}>{errors.side.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ..._styles.rowCenterLeft,
    gap: 25,
    marginBottom: 4,
  },
  sideLabel: {
    fontSize: 14,
    color: colors.neutral[950],
  },
  optionsContainer: {
    ..._styles.rowCenter,
    gap: 20,
  },
  radioOption: {
    ..._styles.rowCenter,
    gap: 4,
  },
  outerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary[600],
  },
  label: {
    fontSize: 12,
    color: colors.neutral[900],
  },
  errorText: {
    fontSize: RFS(12),
    color: 'red',
    marginTop: 4,
  },
});

export default RadioButton;
