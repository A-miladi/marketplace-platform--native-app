import {
  IFormContainer,
  IFormInputs,
  IRenderInputs,
  PropsInput,
} from '@/types/forms';
import {createContext, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RenderInput from './RenderInput';
import RenderNumber from './RenderNumber';
import RenderSelect from './RenderSelect';
import {colors} from '@/styles/colors';
import {RW} from '@/utils/DimensionsChange';
import RenderDate from './renderDate';

const FormContext = createContext<any>({});

const HandleInputType = ({input}: PropsInput) => {
  switch (input.type) {
    case 'TEXT':
      return <RenderInput input={input} />;
    case 'SELECT':
      return <RenderSelect input={input} />;
    case 'NUMBER':
      return <RenderNumber input={input} />;
    case 'DATE':
      return <RenderDate input={input} />;
    default:
      return <></>;
  }
};
const RenderInputs = ({input, style}: IRenderInputs) => {
  const {errors} = useContext(FormContext);

  const renderInput = (
    <View>
      {input.label && (
        <Text
          style={[
            styles.label,
            errors?.[input.name] ? styles.errorLabel : styles.normalLabel,
            input.labelClassName,
          ]}>
          {input.is_required ? (
            <Text>
              {input.label} <Text style={styles.requiredStar}>*</Text>
            </Text>
          ) : (
            input.label
          )}
        </Text>
      )}
      <HandleInputType input={input} />
      {errors?.[input.name] && (
        <Text style={styles.errorText}>
          {errors?.[input.name]?.message || input.helperText}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, style]} key={input.name}>
      <View style={[styles.inputWrapper]}>
        <View
          style={[
            styles.inputBorder,
            errors?.[input.name] ? styles.errorBorder : styles.normalBorder,
          ]}>
          {renderInput}
        </View>
      </View>
    </View>
  );
};

const FormInputs = ({
  children,
  inputs,
  gridProps,
  showDotsInLabel = true,
  style,
  control,
  boxClassName,
  labelClassName,
}: IFormInputs) => {
  return (
    <View style={[styles.formContainer, style]}>
      {inputs.map((input, i) => (
        <RenderInputs
          style={{boxClassName}}
          key={`${input?.name} ${i}`}
          input={{...input, control, labelClassName}}
          gridProps={gridProps}
          showDotsInLabel={showDotsInLabel}
        />
      ))}
      {children}
    </View>
  );
};

const FormContainer = ({children, errors, data, setData}: IFormContainer) => {
  return (
    <FormContext.Provider value={{errors, data, setData}}>
      {children}
    </FormContext.Provider>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 8,
    width: RW(90),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  inputBorder: {
    padding: 10,
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
  },
  normalBorder: {
    borderColor: '#d1d5db',
  },
  errorBorder: {
    borderColor: '#ef4444',
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    paddingLeft: 1,
  },
  normalLabel: {
    color: '#000000',
    fontWeight: 'normal',
  },
  errorLabel: {
    color: '#dc2626',
  },
  requiredStar: {
    color: '#ef4444',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#dc2626',
  },
  inputContainer: {},
});
export {FormContainer, FormInputs};
