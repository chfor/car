// 格式化日期
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// 格式化金额
export const formatMoney = (amount) => {
  if (!amount) return '0.00';
  return Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 验证车牌号
export const isValidLicensePlate = (plate) => {
  const pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/;
  return pattern.test(plate);
};

// 处理API错误
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.error || '服务器错误';
  }
  if (error.request) {
    return '网络请求失败';
  }
  return '发生错误';
};
