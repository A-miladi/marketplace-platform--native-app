export const addCommas = (value: string | number): string => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US');
};
