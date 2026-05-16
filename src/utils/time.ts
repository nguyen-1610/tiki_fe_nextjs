export const getHMS = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(((seconds / 3600) % 1) * 60);
  const s = Math.round(((((seconds / 3600) % 1) * 60) % 1) * 60);

  return {
    h,
    m,
    s,
  };
};
