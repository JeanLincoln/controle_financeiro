import { ReactNode, createContext, useState } from 'react';

type IncomeTransacion = {
  id: string;
  data: string;
  description: string;
  origin: string;
  value: number;
};

type OutcomeTransaction = {
  id: string;
  data: string;
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
  const [incomeValues, setIncomeValues] = useState<IncomeTransacion[]>([
    {
      id: '1',
      data: '10/11/2022',
      description: 'Salario',
      origin: 'Unicred',
      value: 2000,
    },
    {
      id: '2',
      data: '11/11/2022',
      description: 'FreeLancer',
      origin: 'FreeLancer',
      value: 1000,
    },
    {
      id: '3',
      data: '12/11/2022',
      description: 'Bico',
      origin: 'LGPD',
      value: 50,
    },
  ]);

  const [outcomeValues, setOutcomeValues] = useState<OutcomeTransaction[]>([
    {
      id: '1',
      data: '10/11/2022',
      description: 'Hamburguer',
      method: 'Pix',
      type: 'Comida',
      value: 30,
    },
    {
      id: '2',
      data: '11/11/2022',
      description: 'No Mans sky',
      method: 'Credit Card',
      type: 'Jogo',
      value: 100,
    },
    {
      id: '3',
      data: '12/11/2022',
      description: 'Ryzen 5 5500',
      method: 'Credit Card',
      type: 'Eletronic',
      value: 1200,
    },
  ]);

  const incomeTotal = () => {
    const total = incomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
  };

  const outcomeTotal = () => {
    const total = outcomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
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
