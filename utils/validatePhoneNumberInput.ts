export const validatePhoneNumber = (value: string): boolean => {
  if (value === "") return true;
  const phoneNumberPattern = /^\+?\d+$/;
  return phoneNumberPattern.test(value);
};
