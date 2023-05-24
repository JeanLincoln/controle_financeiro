import { api } from "../../axios";
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { differenceInMonths, isSameMonth, isWithinInterval } from "date-fns";
import { FilterMonthDate, TransactionDate } from "../utils/DatesValidation";

import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
  OutcomeTransaction,
} from "../types/TransactionTypes";
import { FixedSorts } from "../utils/SortFixedValues";
import { toast } from "react-toastify";
import {
  createNewFixedTransactions,
  createNewIncomeTransactions,
  createNewOutcomeTransactions,
  deleteFixedTransactions,
  deleteIncomeTransactions,
  deleteOutcomeTransactions,
  fetchFixedTransactions,
  fetchIncomeTransactions,
  fetchOutcomeTransactions,
  updateFixedTransactions,
  updateIncomeTransactions,
  updateOutcomeTransactions,
} from "../services/API";
import {
  createNewIncomeTransactionsFirebase,
  createNewOutcomeTransactionsFirebase,
  fetchFixedTransactionsFirebase,
  fetchIncomeTransactionsFirebase,
  fetchOutcomeTransactionsFirebase,
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
      // const outcomeResponse = await fetchOutcomeTransactions();
      await fetchFixedTransactionsFirebase(filterMonth, setFixedValues);

      // const filteredDate = new Date(
      //   Number(filterMonth.split("-")[0]),
      //   Number(filterMonth.split("-")[1]) - 1
      // );

      // const filteredIncomeResponse = incomeResponse.filter((transaction: IncomeTransaction) =>
      //   isSameMonth(
      //     new Date(transaction.date),
      //     new Date(Number(filterMonth.split('-')[0]), Number(filterMonth.split('-')[1]) - 1)
      //   )
      // )

      // const filteredOutcomeResponse = outcomeResponse.filter(
      //   (transaction: OutcomeTransaction) => {
      //     const datesDifference = differenceInMonths(
      //       FilterMonthDate(filterMonth),
      //       TransactionDate(transaction.date)
      //     );

      //     const ocorringPurchase =
      //       datesDifference >= 0 && datesDifference <= transaction.installment;
      //     const paidPurchase = datesDifference > transaction.installment - 1;

      //     return ocorringPurchase && !paidPurchase;
      //   }
      // );

      // const filteredFixedResponse = fixedResponse.filter(
      //   (transaction: CreateFixedValues) => {
      //     const fixedInitialDate = new Date(transaction.initialDate);
      //     const fixedFinalDate = transaction.finalDate
      //       ? new Date(transaction.finalDate)
      //       : new Date(2999, 1, 1);

      //     return isWithinInterval(filteredDate, {
      //       start: new Date(fixedInitialDate),
      //       end: new Date(fixedFinalDate),
      //     });
      //   }
      // );

      // FixedSorts(filteredFixedResponse);

      // setIncomeValues(filteredIncomeResponse)
      // setOutcomeValues(filteredOutcomeResponse);
      // setFixedValues(filteredFixedResponse);
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
      const response = await createNewIncomeTransactionsFirebase(
        data as CreateIncomeTransaction
      );
      setIncomeValues((state) => [
        response as CreateIncomeTransaction,
        ...state,
      ]);
    }

    if (outcomeTransaction) {
      const response = await createNewOutcomeTransactionsFirebase(
        data as CreateOutcomeTransaction
      );
      setOutcomeValues((state) => [response!, ...state]);
    }

    if (fixedTransaction) {
      const response = await createNewFixedTransactions(
        data as CreateFixedValues
      );
      setFixedValues((state) => [response, ...state]);
    }
  };

  const deleteTransaction = async (type: string, transactionId: string) => {
    const incomeTransaction = type === "income";
    const outcomeTransaction = type === "outcome";
    const fixedTransaction = type === "fixed";

    if (incomeTransaction) {
      await deleteIncomeTransactions(transactionId);

      const remainingTransactions = incomeValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setIncomeValues(remainingTransactions);
      return;
    }
    if (outcomeTransaction) {
      await deleteOutcomeTransactions(transactionId);

      const remainingTransactions = outcomeValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setOutcomeValues(remainingTransactions);
      return;
    }

    if (fixedTransaction) {
      await deleteFixedTransactions(transactionId);

      const remainingTransactions = fixedValues.filter(
        (transaction) => transaction.id !== transactionId
      );
      setFixedValues(remainingTransactions);
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
      await updateIncomeTransactions(
        transactionToUpdateId,
        Transactionupdate as CreateIncomeTransaction
      );
      fetchFilteredMonthTransactions();
    }
    if (outcomeTransaction) {
      await updateOutcomeTransactions(
        transactionToUpdateId,
        Transactionupdate as CreateOutcomeTransaction
      );
      fetchFilteredMonthTransactions();
    }

    if (fixedTransaction) {
      await updateFixedTransactions(
        transactionToUpdateId,
        Transactionupdate as CreateFixedValues
      );
      fetchFilteredMonthTransactions();
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
