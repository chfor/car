export const validateLicensePlate = (plate) => {
  const pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/;
  return pattern.test(plate);
};

export const validateVIN = (vin) => {
  const pattern = /^[A-HJ-NPR-Z0-9]{17}$/;
  return pattern.test(vin);
};

export const validateMileage = (mileage) => {
  return !isNaN(mileage) && mileage >= 0;
};

export const validatePrice = (price) => {
  return !isNaN(price) && price >= 0;
};

export const validateDate = (date) => {
  return !isNaN(Date.parse(date));
};
