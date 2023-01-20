import { api } from '../../axios';
import { ReactNode, createContext, useState, useEffect } from 'react';
import { differenceInMonths, format, formatISO, isSameMonth, isWithinInterval } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';
import { formatMonetary } from '../utils/FormatMonetaryValues';

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
  paymentForm: string;
  installment: number;
  value: number;
};

type FixedValues = {
  id: string;
  initialDate: Date;
  finalDate: Date | undefined;
  description: string;
  type: string;
  value: number;
};

type CreateFixedValues = {
  initialDate: Date;
  finalDate: Date | undefined;
  description: string;
  type: string;
  value: number;
};

type TransactionContextType = {
  incomeValues: IncomeTransacion[];
  outcomeValues: OutcomeTransaction[];
  fixedValues: FixedValues[];
  filterMonth: string;
  setFilterMonth: (FilterMonth: string) => void;
  fetchTransactions: () => void;
  monthlyIncomeTotal: () => number;
  monthlyOutcomeTotal: () => number;
  fixedIncomeTotal: () => number;
  fixedOutcomeTotal: () => number;
  newTransaction: (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => Promise<void>;
  deleteTransaction: (type: string, transactionId: string) => Promise<void>;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsContextProvider({ children }: CyclesContextProviderProps) {
  const [incomeValues, setIncomeValues] = useState<IncomeTransacion[]>([]);
  const [outcomeValues, setOutcomeValues] = useState<OutcomeTransaction[]>([]);
  const [fixedValues, setFixedValues] = useState<FixedValues[]>([]);
  const [filterMonth, setFilterMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
    }`
  );

  const fetchTransactions = async () => {
    const incomeResponse = await api.get('incomeTransactions');
    const outcomeResponse = await api.get('outcomeTransactions');
    const fixedResponse = await api.get('fixedValues');

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
    setFixedValues(fixedResponse.data);
  };

  const newTransaction = async (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => {
    const incomeTransaction = type === 'income';
    const outcomeTransaction = type === 'outcome';
    const fixedTransaction = type === 'fixed';

    if (incomeTransaction) {
      const response = await api.post('incomeTransactions', data);
      setIncomeValues((state) => [response.data, ...state]);
      return;
    }

    if (outcomeTransaction) {
      const response = await api.post('outcomeTransactions', data);
      setOutcomeValues((state) => [response.data, ...state]);
      return;
    }

    if (fixedTransaction) {
      const response = await api.post('fixedValues', data);
      setFixedValues((state) => [response.data, ...state]);
      return;
    }
  };

  const deleteTransaction = async (type: string, transactionId: string) => {
    const incomeTransaction = type === 'income';
    const outcomeTransaction = type === 'outcome';
    const fixedTransaction = type === 'fixed';

    if (incomeTransaction) {
      await api.delete(`incomeTransactions/${transactionId}`);
      const remainingTransactions = incomeValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setIncomeValues(remainingTransactions);
      return;
    }
    if (outcomeTransaction) {
      await api.delete(`outcomeTransactions/${transactionId}`);
      const remainingTransactions = outcomeValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setOutcomeValues(remainingTransactions);
    }

    if (fixedTransaction) {
      await api.delete(`fixedValues/${transactionId}`);
      const remainingTransactions = fixedValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setFixedValues(remainingTransactions);
      return;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filterMonth]);

  const monthlyIncomeTotal = () => {
    const total = incomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return total;
  };

  const monthlyOutcomeTotal = () => {
    const total = outcomeValues.reduce((acc, income) => {
      acc = acc += income.installment > 1 ? income.value / income.installment : income.value;
      return acc;
    }, 0);
    return total;
  };

  const fixedIncomeTotal = () => {
    const fixedIncomesTotal = fixedValues.reduce((acc, income) => {
      const fixedIncome = income.type === 'Entrada';
      const incomeInitialDate = new Date(income.initialDate);
      const incomeFinalDate = income.finalDate ? new Date(income.finalDate) : new Date(2999, 1, 1);
      const filteredDate = new Date(
        Number(filterMonth.split('-')[0]),
        Number(filterMonth.split('-')[1]) - 1
      );

      if (
        fixedIncome &&
        isWithinInterval(filteredDate, {
          start: incomeInitialDate,
          end: incomeFinalDate,
        })
      ) {
        acc = acc += income.value;
      }
      return acc;
    }, 0);

    return fixedIncomesTotal;
  };

  const fixedOutcomeTotal = () => {
    const fixedOutcomesTotal = fixedValues.reduce((acc, income) => {
      const fixedOutcome = income.type === 'Saída';
      const outcomeInitialDate = new Date(income.initialDate);
      const outcomeFinalDate = income.finalDate ? new Date(income.finalDate) : new Date(2999, 1, 1);
      const filteredDate = new Date(
        Number(filterMonth.split('-')[0]),
        Number(filterMonth.split('-')[1]) - 1
      );
      if (
        fixedOutcome &&
        isWithinInterval(filteredDate, {
          start: outcomeInitialDate,
          end: outcomeFinalDate,
        })
      ) {
        acc = acc += income.value;
      }

      return acc;
    }, 0);
    return fixedOutcomesTotal;
  };

  return (
    <TransactionsContext.Provider
      value={{
        incomeValues,
        outcomeValues,
        fixedValues,
        filterMonth,
        setFilterMonth,
        fetchTransactions,
        monthlyIncomeTotal,
        monthlyOutcomeTotal,
        fixedIncomeTotal,
        fixedOutcomeTotal,
        newTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
