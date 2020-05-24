export const getSeconds = (milliseconds: number): number => {
  return Math.ceil(milliseconds / 1000);
};

export const getPercentage = (time: number, duration: number): number => {
  return Math.ceil((time / duration) * 100);
};
