import {removeDashes} from './dashedPhoneInput';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//const phonRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([1-9]{2,3}\\)[ \\-]*)|([1-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const digitsRegex = /(?=.*[0-9])/;
const specialCharRegex = /[!@#$%^&*_]/;

const messages = {
  EMAIL_VALIDATION_TEXT: 'please enter a valid email address.',
  CONFIRM_PASSWORD: 'password does not match.',
  PASSWORD_MIN: 'password must have at least 8 characters.',
  PASSWORD_MAX: 'password must have maximum 36 characters.',
  PHONE_MIN: 'please fill with exactly 10 digits.',
  PHONE_VALIDATION_TEXT: 'please enter a valid phone number.',
  SPECIAL_CHAR:
    'Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]',
  DIGITS: 'Your password must contain at least one digit.',
  LOWER_CASE: 'Your password must contain at least one lower case letter.',
  UPPER_CASE: 'Your password must contain at least one upper case letter.',
  SIGN_IN_SUCCESS: 'Signed in successfully.',
  SIGN_UP_SUCCESS: 'Signed up successfully.',
};

//Password validation
const passwordValidation = (password: string) => {
  if (password.trim().length < 8) {
    return {isValid: false, type: 'password', message: messages.PASSWORD_MIN};
  } else if (password.trim().length > 32) {
    return {isValid: false, type: 'password', message: messages.PASSWORD_MAX};
  } else if (!lowerCaseRegex.test(password)) {
    return {isValid: false, type: 'password', message: messages.LOWER_CASE};
  } else if (!upperCaseRegex.test(password)) {
    return {isValid: false, type: 'password', message: messages.UPPER_CASE};
  } else if (!digitsRegex.test(password)) {
    return {isValid: false, type: 'password', message: messages.DIGITS};
  } else if (!specialCharRegex.test(password)) {
    return {isValid: false, type: 'password', message: messages.SPECIAL_CHAR};
  }
  return {isValid: true, type: '', message: ''};
};

const resetPassValidation = (password: string, confirmPassword: string) => {
  if (password?.trim()) {
    const validation = passwordValidation(password);
    if (validation.isValid) {
      if (confirmPassword?.trim()) {
        if (password !== confirmPassword) {
          return {
            isValid: false,
            type: 'confirmPass',
            message: messages.CONFIRM_PASSWORD,
          };
        }
      }
    }
    return {
      isValid: validation.isValid,
      type: validation.isValid ? '' : 'password',
      message: validation.message,
    };
  }

  return {isValid: true, type: '', message: ''};
};

const signInValidation = (email: string, password: string) => {
  if (email.trim()) {
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        type: 'email',
        message: messages.EMAIL_VALIDATION_TEXT,
      };
    }
  } else {
    return {isValid: false, type: '', message: ''};
  }
  if (!password.trim()) {
    return {isValid: false, type: '', message: ''};
  }
  return {isValid: true, type: '', message: ''};
};

const signUpValidation = (email: string, phone: string, password: string) => {
  if (email.trim()) {
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        type: 'email',
        message: messages.EMAIL_VALIDATION_TEXT,
      };
    }
  }
  if (phone?.trim() && removeDashes(phone)?.length < 10) {
    return {isValid: false, type: 'phone', message: messages.PHONE_MIN};
  }
  if (password.trim()) {
    return passwordValidation(password);
  }
};

const emailValidation = (email: string) => {
  if (email.trim()) {
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        type: 'email',
        message: messages.EMAIL_VALIDATION_TEXT,
      };
    }
  } else {
    return {isValid: false, type: '', message: ''};
  }
  return {isValid: true, type: '', message: ''};
};

export {
  emailValidation,
  passwordValidation,
  resetPassValidation,
  signInValidation,
  signUpValidation,
};
