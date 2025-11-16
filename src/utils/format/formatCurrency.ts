export function formatCurrency(
  amount: number,
  currency: string = 'KRW',
  locale: string = 'ko-KR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}


