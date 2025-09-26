export const formatMileage = (mileage) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
