import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { isWithinInterval } from "date-fns";
import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
} from "../types/TransactionTypes";
import { toast } from "react-toastify";
import {
  createNewFixedTransactionsFirebase,
  createNewIncomeTransactionsFirebase,
  createNewOutcomeTransactionsFirebase,
  deleteFixedTransactionsFirebase,
  deleteIncomeTransactionsFirebase,
  deleteOutcomeTransactionsFirebase,
  fetchFixedTransactionsFirebase,
  fetchIncomeTransactionsFirebase,
  fetchOutcomeTransactionsFirebase,
  updateFixedTransactionsFirebase,
  updateIncomeTransactionsFirebase,
  updateOutcomeTransactionsFirebase,
} from "../services/firestoreDatabase";

type TransactionContextType = {
  loading: Boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  incomeValues: CreateIncomeTransaction[];
  outcomeValues: CreateOutcomeTransaction[];
  fixedValues: CreateFixedValues[];
  filterMonth: string;
  setFilterMonth: (FilterMonth: string) => void;
  monthlyIncomeTotal: () => number;
  monthlyOutcomeTotal: () => number;
  fixedIncomeTotal: () => number;
  fixedOutcomeTotal: () => number;
  createNewTransaction: (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => void;
  deleteTransaction: (type: string, transactionId: string) => Promise<void>;
  updateTransaction: (
    transactionToUpdateId: string,
    type: string,
    updateTransaction:
      | CreateIncomeTransaction
      | CreateOutcomeTransaction
      | CreateFixedValues
  ) => Promise<void>;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [incomeValues, setIncomeValues] = useState<CreateIncomeTransaction[]>(
    []
  );
  const [outcomeValues, setOutcomeValues] = useState<
    CreateOutcomeTransaction[]
  >([]);
  const [fixedValues, setFixedValues] = useState<CreateFixedValues[]>([]);
  const [filterMonth, setFilterMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`
    }`
  );

  const fetchFilteredMonthTransactions = async () => {
    setLoading(true);
    try {
      await fetchIncomeTransactionsFirebase(filterMonth, setIncomeValues);
      await fetchOutcomeTransactionsFirebase(filterMonth, setOutcomeValues);
      await fetchFixedTransactionsFirebase(filterMonth, setFixedValues);
      setLoading(false);
    } catch ({ message, error }: any) {
      toast(
        "Houve um erro ao carregar as transações:\n" + `${message}:${error}`,
        {
          className: "error",
        }
      );
    }
  };

  const createNewTransaction = async (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => {
    const incomeTransaction = type === "income";
    const outcomeTransaction = type === "outcome";
    const fixedTransaction = type === "fixed";

    if (incomeTransaction) {
      await createNewIncomeTransactionsFirebase(
        data as CreateIncomeTransaction
      );
    }

    if (outcomeTransaction) {
      await createNewOutcomeTransactionsFirebase(
        data as CreateOutcomeTransaction
      );
    }

    if (fixedTransaction) {
      await createNewFixedTransactionsFirebase(data as CreateFixedValues);
    }
  };

  const deleteTransaction = async (type: string, transactionId: string) => {
    const incomeTransaction = type === "income";
    const outcomeTransaction = type === "outcome";
    const fixedTransaction = type === "fixed";

    if (incomeTransaction) {
      await deleteIncomeTransactionsFirebase(transactionId);
      return;
    }
    if (outcomeTransaction) {
      await deleteOutcomeTransactionsFirebase(transactionId);
      return;
    }

    if (fixedTransaction) {
      await deleteFixedTransactionsFirebase(transactionId);
      return;
    }
  };

  const updateTransaction = async (
    transactionToUpdateId: string,
    type: string,
    Transactionupdate:
      | CreateIncomeTransaction
      | CreateOutcomeTransaction
      | CreateFixedValues
  ) => {
    const incomeTransaction = type === "income";
    const outcomeTransaction = type === "outcome";
    const fixedTransaction = type === "fixed";

    if (incomeTransaction) {
      await updateIncomeTransactionsFirebase(
        transactionToUpdateId,
        Transactionupdate as CreateIncomeTransaction
      );
    }
    if (outcomeTransaction) {
      await updateOutcomeTransactionsFirebase(
        transactionToUpdateId,
        Transactionupdate as CreateOutcomeTransaction
      );
    }

    if (fixedTransaction) {
      await updateFixedTransactionsFirebase(
        transactionToUpdateId,
        Transactionupdate as CreateFixedValues
      );
    }
  };

  useEffect(() => {
    fetchFilteredMonthTransactions();
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
      acc = acc +=
        income.installment > 1
          ? income.value / income.installment
          : income.value;
      return acc;
    }, 0);
    return total;
  };

  const fixedIncomeTotal = () => {
    const fixedIncomesTotal = fixedValues.reduce((acc, income) => {
      const fixedIncome = income.type === "Entrada";
      const incomeInitialDate = new Date(income.initialDate);
      const incomeFinalDate = income.finalDate
        ? new Date(income.finalDate)
        : new Date(2999, 1, 1);
      const filteredDate = new Date(
        Number(filterMonth.split("-")[0]),
        Number(filterMonth.split("-")[1]) - 1
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
      const fixedOutcome = income.type === "Saída";
      const outcomeInitialDate = new Date(income.initialDate);
      const outcomeFinalDate = income.finalDate
        ? new Date(income.finalDate)
        : new Date(2999, 1, 1);
      const filteredDate = new Date(
        Number(filterMonth.split("-")[0]),
        Number(filterMonth.split("-")[1]) - 1
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
        loading,
        setLoading,
        incomeValues,
        outcomeValues,
        fixedValues,
        filterMonth,
        setFilterMonth,
        monthlyIncomeTotal,
        monthlyOutcomeTotal,
        fixedIncomeTotal,
        fixedOutcomeTotal,
        createNewTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
