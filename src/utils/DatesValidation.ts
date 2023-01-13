export const FilterMonthDate = (filterMonth: string) =>
  new Date(Number(filterMonth.split('-')[0]), Number(filterMonth.split('-')[1]) - 1, 1, 1);

export const TransactionDate = (transactionDate: Date) =>
  new Date(new Date(transactionDate).getFullYear(), new Date(transactionDate).getMonth(), 1, 1);
