import { api } from '../../axios';
import { ReactNode, createContext, useState, useEffect } from 'react';

type IncomeTransacion = {
  id: string;
  data: Date;
  description: string;
  origin: string;
  value: number;
};

type OutcomeTransaction = {
  id: string;
  data: Date;
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
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
