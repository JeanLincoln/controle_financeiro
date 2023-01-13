import { api } from '../../axios';
import { ReactNode, createContext, useState, useEffect } from 'react';
import { differenceInMonths, isSameMonth } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';

type IncomeTransacion = {
  id: string;
  date: Date;
  description: string;
  origin: string;
  value: number;
};

type CreateIncomeTransaction = {
  date: Date;
  description: string;
  origin: string;
  value: number;
};

type OutcomeTransaction = {
  id: string;
  date: Date;
  description: string;
  method: string;
  type: string;
  paymentForm: string;
  installment: number;
  value: number;
};

type CreateOutcomeTransaction = {
  date: Date;
  description: string;
  method: string;
  type: string;
  value: number;
};

type TransactionContextType = {
  incomeValues: IncomeTransacion[];
  outcomeValues: OutcomeTransaction[];
  filterMonth: string;
  setFilterMonth: (FilterMonth: string) => void;
  fetchTransactions: () => void;
  incomeTotal: () => string;
  outcomeTotal: () => string;
  pickings: () => string;
  newTransaction: (type: string, data: CreateIncomeTransaction | CreateOutcomeTransaction) => void;
  deleteTransaction: (type: string, transactionId: string) => void;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsContextProvider({ children }: CyclesContextProviderProps) {
  const [incomeValues, setIncomeValues] = useState<IncomeTransacion[]>([]);
  const [outcomeValues, setOutcomeValues] = useState<OutcomeTransaction[]>([]);
  const [filterMonth, setFilterMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
    }`
  );

  const fetchTransactions = async () => {
    const incomeResponse = await api.get('incomeTransactions');
    const outcomeResponse = await api.get('outcomeTransactions');

    const filteredIncomeResponse = incomeResponse.data.filter((transaction: IncomeTransacion) =>
      isSameMonth(
        new Date(transaction.date),
        new Date(Number(filterMonth.split('-')[0]), Number(filterMonth.split('-')[1]) - 1)
      )
    );

    const filteredOutcomeResponse = outcomeResponse.data.filter(
      (transaction: OutcomeTransaction) => {
        const datesDifference = differenceInMonths(
          FilterMonthDate(filterMonth),
          TransactionDate(transaction.date)
        );

        const ocorringPurchase = datesDifference >= 0 && datesDifference <= transaction.installment;
        const paidPurchase = datesDifference > transaction.installment - 1;

        return ocorringPurchase && !paidPurchase;
      }
    );

    setIncomeValues(filteredIncomeResponse);
    setOutcomeValues(filteredOutcomeResponse);
  };

  const newTransaction = async (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction
  ) => {
    if (type === 'income') {
      const response = await api.post('incomeTransactions', data);
      setIncomeValues((state) => [response.data, ...state]);
      return;
    }
    const response = await api.post('outcomeTransactions', data);
    setOutcomeValues((state) => [response.data, ...state]);
  };

  const deleteTransaction = async (type: string, transactionId: string) => {
    if (type === 'income') {
      await api.delete(`incomeTransactions/${transactionId}`);
      const remainingTransactions = incomeValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setIncomeValues(remainingTransactions);
      return;
    }
    await api.delete(`outcomeTransactions/${transactionId}`);
    const remainingTransactions = outcomeValues.filter(
      (transaction) => transaction.id !== transactionId
    );
    setOutcomeValues(remainingTransactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, [filterMonth]);

  const incomeTotal = () => {
    const total = incomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total);
  };

  const outcomeTotal = () => {
    const total = outcomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total);
  };

  const pickings = () => {
    const incomesTotal = incomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);

    const outcomesTotal = outcomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);

    const total = incomesTotal - outcomesTotal;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total);
  };

  return (
    <TransactionsContext.Provider
      value={{
        incomeValues,
        outcomeValues,
        filterMonth,
        setFilterMonth,
        fetchTransactions,
        incomeTotal,
        outcomeTotal,
        pickings,
        newTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
