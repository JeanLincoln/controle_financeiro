import { Timestamp } from "firebase/firestore";

export type CreateIncomeTransaction = {
  id: string;
  date: Date;
  description: string;
  origin: string;
  value: number;
};

export type FirebaseIncomeTransaction = {
  id: string;
  date: Timestamp;
  description: string;
  origin: string;
  value: number;
};

export type CreateOutcomeTransaction = {
  date: Date;
  description: string;
  method: string;
  type: string;
  paymentForm: string;
  installment: number;
  value: number;
};

export type OutcomeTransaction = {
  id: string;
  [key: string]: string;
} & CreateOutcomeTransaction;

export type CreateFixedValues = {
  initialDate: Date;
  finalDate: Date | undefined;
  description: string;
  type: string;
  value: number;
};

export type FixedValues = {
  id: string;
  [key: string]: string;
} & CreateFixedValues;

export type IncomeSearchProps = {
  dateFilter: string;
  descriptionFilter: string;
  originFilter: string;
  valueFilter: string;
};

export type OutcomeSearchProps = {
  dateFilter: string;
  descriptionFilter: string;
  methodFilter: string;
  typeFilter: string;
  paymentFormFilter: string;
  installmentFilter: string;
  valueFilter: string;
};

export type FixedSearchProps = {
  initialDateFilter: string;
  finalDateFilter: string;
  descriptionFilter: string;
  typeFilter: string;
  valueFilter: string;
};
