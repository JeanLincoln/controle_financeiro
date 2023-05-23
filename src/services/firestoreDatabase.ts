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
  CreateIncomeTransaction,
  FirebaseIncomeTransaction,
} from "../types/TransactionTypes";
import { isSameMonth } from "date-fns";
import { Dispatch, SetStateAction } from "react";

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
