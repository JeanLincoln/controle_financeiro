import { Timestamp } from "firebase/firestore";

export type CreateIncomeTransaction = {
  userId: string;
  id: string;
  date: Date;
  description: string;
  origin: string;
  value: number;
};

export type FirebaseIncomeTransaction = {
  userId: string;
  id: string;
  date: Timestamp;
  description: string;
  origin: string;
  value: number;
};

export type FirebaseOutcomeTransaction = {
  userId: string;
  id: string;
  date: Timestamp;
  description: string;
  installment: number;
  method: string;
  paymentForm: string;
  type: string;
  value: number;
};

export type CreateOutcomeTransaction = {
  userId: string;
  id: string;
  date: Date;
  description: string;
  method: string;
  type: string;
  paymentForm: string;
  installment: number;
  value: number;
};

export type CreateFixedValues = {
  userId: string;
  id: string;
  initialDate: Date;
  finalDate: Date;
  description: string;
  type: string;
  value: number;
};

export type FirebaseFixedTransaction = {
  userId: string;
  id: string;
  initialDate: Timestamp;
  finalDate: Timestamp;
  description: string;
  type: string;
  value: number;
};

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
