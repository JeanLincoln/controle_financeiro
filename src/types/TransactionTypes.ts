export type CreateIncomeTransaction = {
  date: Date;
  description: string;
  origin: string;
  value: number;
};

export type IncomeTransacion = {
  id: string;
} & CreateIncomeTransaction;

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
} & CreateFixedValues;
