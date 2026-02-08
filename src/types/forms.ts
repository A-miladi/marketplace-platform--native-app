/* eslint-disable @typescript-eslint/no-explicit-any */
import {Control, FieldErrors, FieldValues} from 'react-hook-form';

export interface IFormContainer {
  errors?: FieldErrors;
  children: React.ReactNode;
  data?: any;
  setData?: (name: any, value: any) => void;
}

export interface FieldsProps {
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
}

export type TGridProps = {
  colSpan?: string;
  flexBasis?: string;
};

export interface IInput {
  type: 'TEXT' | 'NUMBER' | 'SELECT' | 'DATE';
  name: string;
  label?: string;
  placeholder?: string;
  gridProps?: TGridProps;
  rules?: any;
  style?: object;
  control?: any;
  defaultValue?: any;
  is_required?: boolean;
  validation?: {
    min?: number;
    min_date?: string;
    max_date?: string;
    enum?: string[];
    multiple?: boolean;
    type?: string;
  };
  options?: Array<{
    label: string;
    value: string;
  }>;
  helperText?: string;
  labelClassName?: object;
}

export interface IFormInputs {
  inputs: IInput[];
  children?: React.ReactNode;
  gridProps?: TGridProps;
  spacing?: number;
  showDotsInLabel?: boolean;
  style?: object;
  boxClassName?: object;
  control?: any;
  labelClassName?: object;
}

export interface IRenderInputs {
  input: IInput;
  style?: object;
  gridProps?: TGridProps;
  showDotsInLabel?: boolean;
}

export interface PropsInput {
  input: IInput;
}
