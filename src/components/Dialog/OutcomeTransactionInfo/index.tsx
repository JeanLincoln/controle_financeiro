import * as S from "../../../styles/components/Dialog";
import { Dispatch, SetStateAction, useContext } from "react";
import { CreateOutcomeTransaction } from "../../../types/TransactionTypes";
import { addMonths, differenceInMonths, format } from "date-fns";
import { formatMonetary } from "../../../utils/FormatMonetaryValues";
import {
  FilterMonthDate,
  TransactionDate,
} from "../../../utils/DatesValidation";
import { TransactionsContext } from "../../../contexts/TransactionsContext";

type TriggerProps = {
  type: "income" | "outcome" | "fixed";
  setOpen: Dispatch<SetStateAction<boolean>>;
  transaction: CreateOutcomeTransaction;
};

export const OutcomeTransactionsInfo = ({
  type,
  setOpen,
  transaction,
}: TriggerProps) => {
  const CalculateActualInstallment = (date: Date) => {
    const { filterMonth } = useContext(TransactionsContext);
    const datesDifference = differenceInMonths(
      FilterMonthDate(filterMonth),
      TransactionDate(date)
    );

    return datesDifference + 1;
  };
  return (
    <S.Content>
      <S.Title>Informações da transação</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <div>
        <div>
          <strong>Data</strong>
          <span>{format(new Date(transaction!.date), "dd/MM/yyyy")}</span>
        </div>
        <div>
          <strong>Finaliza em:</strong>
          <span>
            {" "}
            {transaction!.installment !== 1
              ? format(
                  addMonths(
                    new Date(transaction!.date),
                    transaction!.installment
                  ),
                  "dd/MM/yyyy"
                )
              : format(new Date(transaction!.date), "dd/MM/yyyy")}
          </span>
        </div>
        <div>
          <strong>Descrição </strong>
          <span>{transaction!.description}</span>
        </div>
        <div>
          <strong>Método </strong>
          <span>{transaction!.method}</span>
        </div>
        <div>
          <strong>Tipo </strong>
          <span>{transaction!.type}</span>
        </div>
        <div>
          <strong>Forma de pagamento </strong>
          <span>{transaction!.paymentForm}</span>
        </div>
        <div>
          <strong>Parcela atual/ Parcelas </strong>
          <span>
            {CalculateActualInstallment(transaction!.date)} /{" "}
            {transaction!.installment}
          </span>
        </div>
        <div>
          <strong>Valor da parcela </strong>
          <span>
            {formatMonetary(transaction!.value / transaction!.installment)}
          </span>
        </div>
        <div>
          <strong>Valor da compra </strong>
          <span>{formatMonetary(transaction!.value)}</span>
        </div>
        <div>
          <strong>Valor restante: </strong>
          <span>
            {formatMonetary(
              transaction!.value -
                (transaction!.value / transaction!.installment) *
                  CalculateActualInstallment(transaction!.date)
            )}
          </span>
        </div>
      </div>
    </S.Content>
  );
};
