import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  fixedValuesCollection,
  incomeTransactionsCollection,
  outcomeTransactionsCollection,
} from "./Firebase";
import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
  FirebaseFixedTransaction,
  FirebaseIncomeTransaction,
  FirebaseOutcomeTransaction,
} from "../types/TransactionTypes";
import { differenceInMonths, isSameMonth, isWithinInterval } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { FilterMonthDate, TransactionDate } from "../utils/DatesValidation";
import { FixedSorts } from "../utils/SortFixedValues";

export const fetchIncomeTransactionsFirebase = async (
  filterMonth: string,
  setIncomeValues: Dispatch<SetStateAction<CreateIncomeTransaction[]>>
) => {
  try {
    onSnapshot(incomeTransactionsCollection, (snapshot) => {
      const incomeTransactions = snapshot.docs.map((doc) =>
        doc.data()
      ) as FirebaseIncomeTransaction[];

      const transformedIncomeTransactions = incomeTransactions.map(
        (transaction) => ({
          ...transaction,
          date: transaction.date.toDate(),
        })
      );

      const orderedIncomeTransactions = transformedIncomeTransactions.sort(
        (a, b) => {
          return b.date.getTime() - a.date.getTime();
        }
      );

      const filteredIncomeResponse = orderedIncomeTransactions.filter(
        (transaction: CreateIncomeTransaction) =>
          isSameMonth(
            new Date(transaction.date),
            new Date(
              Number(filterMonth.split("-")[0]),
              Number(filterMonth.split("-")[1]) - 1
            )
          )
      );
      setIncomeValues(filteredIncomeResponse);
    });
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao carregar as transações de entrada:\n" +
        `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};

export const createNewIncomeTransactionsFirebase = async (
  vehicleToPost: CreateIncomeTransaction
) => {
  try {
    await addDoc(incomeTransactionsCollection, vehicleToPost);
    toast("Transação de entrada inserida !", { className: "success" });
    return vehicleToPost;
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao criar a transação de entrada:\n" +
        `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};

export const fetchOutcomeTransactionsFirebase = async (
  filterMonth: string,
  setOutcomeValues: Dispatch<SetStateAction<CreateOutcomeTransaction[]>>
) => {
  try {
    onSnapshot(outcomeTransactionsCollection, (snapshot) => {
      const outcomeTransactions = snapshot.docs.map((doc) =>
        doc.data()
      ) as FirebaseOutcomeTransaction[];

      const transformedOutcomeTransactions = outcomeTransactions.map(
        (transaction) => ({
          ...transaction,
          date: transaction.date.toDate(),
        })
      );

      const orderedOutcomeTransactions = transformedOutcomeTransactions.sort(
        (a, b) => {
          return b.date.getTime() - a.date.getTime();
        }
      );

      const filteredOutcomeResponse = orderedOutcomeTransactions.filter(
        (transaction: CreateOutcomeTransaction) => {
          const datesDifference = differenceInMonths(
            FilterMonthDate(filterMonth),
            TransactionDate(transaction.date)
          );

          const ocorringPurchase =
            datesDifference >= 0 && datesDifference <= transaction.installment;
          const paidPurchase = datesDifference > transaction.installment - 1;

          return ocorringPurchase && !paidPurchase;
        }
      );
      setOutcomeValues(filteredOutcomeResponse);
    });
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao carregar as transações de Saída:\n" +
        `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};

export const fetchFixedTransactionsFirebase = async (
  filterMonth: string,
  setFixedValues: Dispatch<SetStateAction<CreateFixedValues[]>>
) => {
  try {
    onSnapshot(fixedValuesCollection, (snapshot) => {
      const FixedTransactions = snapshot.docs.map((doc) =>
        doc.data()
      ) as FirebaseFixedTransaction[];

      const filteredDate = new Date(
        Number(filterMonth.split("-")[0]),
        Number(filterMonth.split("-")[1]) - 1
      );

      const transformedFixedTransactions = FixedTransactions.map(
        (transaction) => ({
          ...transaction,
          initialDate: transaction.initialDate.toDate(),
          finalDate: transaction.finalDate.toDate(),
        })
      );

      const filteredFixedResponse = transformedFixedTransactions.filter(
        (transaction: CreateFixedValues) => {
          const fixedInitialDate = new Date(transaction.initialDate);
          const fixedFinalDate = transaction.finalDate
            ? new Date(transaction.finalDate)
            : new Date(2999, 1, 1);

          return isWithinInterval(filteredDate, {
            start: new Date(fixedInitialDate),
            end: new Date(fixedFinalDate),
          });
        }
      );

      FixedSorts(filteredFixedResponse);

      setFixedValues(filteredFixedResponse);
    });
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao carregar as transações fixas:\n" +
        `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};
