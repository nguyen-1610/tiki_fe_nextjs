export const formatCurrency = (
  locale: string,
  currency: string,
  amount: number,
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })
    .format(amount)
    .slice(0, -1);
};
