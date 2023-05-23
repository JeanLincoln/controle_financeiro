import { format } from "date-fns";
import {
  OutcomeTransaction,
  OutcomeSearchProps,
  IncomeSearchProps,
  FixedSearchProps,
  CreateIncomeTransaction,
  FixedValues,
} from "../types/TransactionTypes";

type handleOutcomeSearchProps = {
  searchFilters: OutcomeSearchProps;
  clearSearchedTransanctions: () => void;
  insertSearchedTransanctions: (transactions: OutcomeTransaction[]) => void;
  transactionValues: OutcomeTransaction[];
};

type handleIncomeSearchProps = {
  searchFilters: IncomeSearchProps;
  clearSearchedTransanctions: () => void;
  insertSearchedTransanctions: (
    transactions: CreateIncomeTransaction[]
  ) => void;
  transactionValues: CreateIncomeTransaction[];
};

type handlefixedSearchProps = {
  searchFilters: FixedSearchProps;
  clearSearchedTransanctions: () => void;
  insertSearchedTransanctions: (transactions: FixedValues[]) => void;
  transactionValues: FixedValues[];
};

export const handleOutcomeSearch = ({
  searchFilters,
  clearSearchedTransanctions,
  insertSearchedTransanctions,
  transactionValues,
}: handleOutcomeSearchProps) => {
  if (!searchFilters) {
    clearSearchedTransanctions();
    return;
  }

  let filteredTransactions = transactionValues;

  if (searchFilters.dateFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return (
        format(new Date(transaction.date), "yyyy-MM-dd") ===
        searchFilters.dateFilter
      );
    });
  }

  if (searchFilters.descriptionFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.description
        .toUpperCase()
        .includes(searchFilters.descriptionFilter.toUpperCase());
    });
  }
  if (searchFilters.methodFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.method === searchFilters.methodFilter;
    });
  }

  if (searchFilters.typeFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.type === searchFilters.typeFilter;
    });
  }
  if (searchFilters.paymentFormFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.paymentForm === searchFilters.paymentFormFilter;
    });
  }
  if (searchFilters.installmentFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return (
        transaction.installment.toString() === searchFilters.installmentFilter
      );
    });
  }
  if (searchFilters.valueFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.value
        .toString()
        .includes(searchFilters.valueFilter.toString());
    });
  }

  filteredTransactions.length > 0
    ? insertSearchedTransanctions(filteredTransactions)
    : clearSearchedTransanctions();
  return;
};

export const handleIncomeSearch = ({
  searchFilters,
  clearSearchedTransanctions,
  insertSearchedTransanctions,
  transactionValues,
}: handleIncomeSearchProps) => {
  if (!searchFilters) {
    clearSearchedTransanctions();
    return;
  }

  let filteredTransactions = transactionValues;

  if (searchFilters.dateFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return (
        format(new Date(transaction.date), "yyyy-MM-dd") ===
        searchFilters.dateFilter
      );
    });
  }

  if (searchFilters.descriptionFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.description
        .toUpperCase()
        .includes(searchFilters.descriptionFilter.toUpperCase());
    });
  }

  if (searchFilters.originFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.origin
        .toUpperCase()
        .includes(searchFilters.originFilter.toUpperCase());
    });
  }

  if (searchFilters.valueFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.value
        .toString()
        .includes(searchFilters.valueFilter.toString());
    });
  }

  filteredTransactions.length > 0
    ? insertSearchedTransanctions(filteredTransactions)
    : clearSearchedTransanctions();
  return;
};

export const handlefixedSearch = ({
  searchFilters,
  clearSearchedTransanctions,
  insertSearchedTransanctions,
  transactionValues,
}: handlefixedSearchProps) => {
  if (!searchFilters) {
    clearSearchedTransanctions();
    return;
  }

  let filteredTransactions = transactionValues;

  if (searchFilters.initialDateFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return (
        format(new Date(transaction.initialDate), "yyyy-MM-dd") ===
        searchFilters.initialDateFilter
      );
    });
  }

  if (searchFilters.descriptionFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.description
        .toUpperCase()
        .includes(searchFilters.descriptionFilter.toUpperCase());
    });
  }

  if (searchFilters.typeFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.type === searchFilters.typeFilter;
    });
  }

  if (searchFilters.valueFilter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      return transaction.value
        .toString()
        .includes(searchFilters.valueFilter.toString());
    });
  }

  filteredTransactions.length > 0
    ? insertSearchedTransanctions(filteredTransactions)
    : clearSearchedTransanctions();
  return;
};
