import { api } from '../../axios';
import { ReactNode, createContext, useState, useEffect } from 'react';

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
  incomeTotal: () => string;
  outcomeTotal: () => string;
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

  const fetchTransactions = async () => {
    const incomeResponse = await api.get('incomeTransactions');
    const outcomeResponse = await api.get('outcomeTransactions');
    setIncomeValues(incomeResponse.data);
    setOutcomeValues(outcomeResponse.data);
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
  }, []);

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

  return (
    <TransactionsContext.Provider
      value={{
        incomeValues,
        outcomeValues,
        incomeTotal,
        outcomeTotal,
        newTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
