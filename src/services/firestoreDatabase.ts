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
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  db,
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

// Buscar transações

export const fetchIncomeTransactionsFirebase = async (
  filterMonth: string,
  setIncomeValues: Dispatch<SetStateAction<CreateIncomeTransaction[]>>,
  userUid: string
) => {
  try {
    const q = query(
      collection(db, "incomeTransactions"),
      where("userId", "==", userUid)
    );
    onSnapshot(q, (snapshot) => {
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

export const fetchChartOutcomeTransactions = async () => {
  const chartOutcomeTransactions = [] as FirebaseOutcomeTransaction[];
  const q = query(collection(db, "outcomeTransactions"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    chartOutcomeTransactions.push(doc.data() as FirebaseOutcomeTransaction);
  });

  const transformedOutcomeTransactions = chartOutcomeTransactions.map(
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

  return orderedOutcomeTransactions;
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
          const fixedFinalDate = new Date(transaction.finalDate);

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

// Buscar transações /

// Criar Transações

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

export const createNewOutcomeTransactionsFirebase = async (
  vehicleToPost: CreateOutcomeTransaction
) => {
  try {
    await addDoc(outcomeTransactionsCollection, vehicleToPost);
    toast("Transação de Saida inserida !", { className: "success" });
    return vehicleToPost;
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao criar a transação de saída:\n" + `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};

export const createNewFixedTransactionsFirebase = async (
  vehicleToPost: CreateFixedValues
) => {
  try {
    debugger;
    await addDoc(fixedValuesCollection, vehicleToPost);
    toast("Transação fixa inserida !", { className: "success" });
    return vehicleToPost;
  } catch ({ message, error }: any) {
    toast(
      "Houve um erro ao criar a transação fixa:\n" + `${message}:${error}`,
      {
        className: "error",
      }
    );
  }
};

// Criar Transações /

// Deletar Transações

export const deleteIncomeTransactionsFirebase = async (
  transactionToDeleteId: string
) => {
  try {
    const q = query(
      collection(db, "incomeTransactions"),
      where("id", "==", transactionToDeleteId)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const TransactionToDelete = doc(db, "incomeTransactions", docId);
    await deleteDoc(TransactionToDelete);
    toast("A transação de entrada foi excluída!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a exclusão da transação de entrada:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

export const deleteOutcomeTransactionsFirebase = async (
  transactionToDeleteId: string
) => {
  try {
    const q = query(
      collection(db, "outcomeTransactions"),
      where("id", "==", transactionToDeleteId)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const TransactionToDelete = doc(db, "outcomeTransactions", docId);
    await deleteDoc(TransactionToDelete);
    toast("A transação de Saída foi excluída!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a exclusão da transação de Saída:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

export const deleteFixedTransactionsFirebase = async (
  transactionToDeleteId: string
) => {
  try {
    const q = query(
      collection(db, "fixedValues"),
      where("id", "==", transactionToDeleteId)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const TransactionToDelete = doc(db, "fixedValues", docId);
    await deleteDoc(TransactionToDelete);
    toast("A transação fixa foi excluída!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a exclusão da transação fixa:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

// Deletar Transações /

// Atualizar Transações

export const updateIncomeTransactionsFirebase = async (
  transactionToUpdateid: string,
  UpdateData: CreateIncomeTransaction
) => {
  try {
    const q = query(
      collection(db, "incomeTransactions"),
      where("id", "==", transactionToUpdateid)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const transactionDoc = doc(db, "incomeTransactions", docId);
    await updateDoc(transactionDoc, UpdateData);
    toast("A transação de entrada foi atualizada!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a atualização da transação de entrada!:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

export const updateOutcomeTransactionsFirebase = async (
  transactionToUpdateid: string,
  UpdateData: CreateOutcomeTransaction
) => {
  try {
    const q = query(
      collection(db, "outcomeTransactions"),
      where("id", "==", transactionToUpdateid)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const transactionDoc = doc(db, "outcomeTransactions", docId);
    await updateDoc(transactionDoc, UpdateData);
    toast("A transação de Sáida foi atualizada!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a atualização da transação de Saída!:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

export const updateFixedTransactionsFirebase = async (
  transactionToUpdateid: string,
  UpdateData: CreateFixedValues
) => {
  try {
    const q = query(
      collection(db, "fixedValues"),
      where("id", "==", transactionToUpdateid)
    );
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const transactionDoc = doc(db, "fixedValues", docId);
    await updateDoc(transactionDoc, UpdateData);
    toast("A transação fixa foi atualizada!", {
      className: "success",
    });
  } catch ({ message, name }: any) {
    toast(
      "Houve um erro com a atualização da transação fixa!:\n" +
        `${message}:${name}`,
      {
        className: "error",
      }
    );
  }
};

// Atualizar Transações /
