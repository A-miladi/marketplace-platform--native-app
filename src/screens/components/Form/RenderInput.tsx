import React, {memo} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';
import {PropsInput} from '@/types/Forms';
import {colors} from '@/styles/colors';

const RenderInput = ({input}: PropsInput) => {
  const {
    field,
    fieldState: {error},
  } = useController({
    name: input.name,
    control: input.control,
    rules: {
      required: input.is_required ? `${input.label} is required` : false,
      ...input.rules,
    },
    defaultValue: input.defaultValue ?? '',
  });

  const handleOnChanged = (text: string) => {
    field.onChange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={field.ref}
        value={field.value || ''}
        placeholder={input.placeholder}
        placeholderTextColor={colors.neutral[500]}
        onChangeText={handleOnChanged}
        style={[
          styles.input,
          error ? styles.errorInput : styles.normalInput,
          input.style,
        ]}
        onBlur={field.onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 12,
  },
  normalInput: {
    borderColor: colors.neutral[400],
  },
  errorInput: {
    borderColor: '#ef4444',
  },
});

export default memo(RenderInput);
