export const validatePhoneNumber = (value: string): boolean => {
  if (value === "") return true;
  const phoneNumberPattern = /^\+?\d+$/;
  return phoneNumberPattern.test(value);
};

export const inputMustBeInteger = (input: string) => {
  return Number.isInteger(Number(input));
};
