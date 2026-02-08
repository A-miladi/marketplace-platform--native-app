import {PropsInput} from '@/types/Forms';
import {memo} from 'react';
import {useController} from 'react-hook-form';
import Dropdown from '../common/dropDown';

const RenderSelect = ({input}: PropsInput) => {
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
    defaultValue: input.validation?.multiple ? [] : '',
  });

  const selectedValue = input.validation?.multiple
    ? Array.isArray(field.value)
      ? field.value
      : []
    : field.value;

  return (
    <Dropdown
      style={{width: '100%'}}
      selectedValue={selectedValue}
      onSelect={value => field.onChange(value)}
      options={input.options || []}
      multiSelect={input.validation?.multiple}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default memo(RenderSelect);
