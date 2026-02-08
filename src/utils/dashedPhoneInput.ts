function normalizePhoneInput(value: string) {
  if (value?.length < 13) {
    let cleaned = ('' + value).replace(/\D/g, '');
    let normValue = `${cleaned.substring(0, 3)}${
      cleaned.length > 3 ? '-' : ''
    }${cleaned.substring(3, 6)}${
      cleaned.length > 6 ? '-' : ''
    }${cleaned.substring(6, 11)}`;
    return normValue;
  }
}

function removeDashes(dashedPhone: string) {
  if (!dashedPhone) {
    return '';
  }
  const normString = dashedPhone?.split('-')?.join('');
  return normString;
}

export {normalizePhoneInput, removeDashes};
