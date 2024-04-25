export const validatePhoneNumber = (value: string) => {
  const cleanedValue = value.replace(/[^+\d]/g, "");
  const phoneNumberPattern = /^[\+\d()\-\s]+$/;
  return phoneNumberPattern.test(cleanedValue);
};
