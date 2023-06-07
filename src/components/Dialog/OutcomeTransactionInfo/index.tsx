import * as S from "../../../styles/components/OutcomeTransactionsInfo";
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
  type: "outcome";
  setOpen: Dispatch<SetStateAction<boolean>>;
  transaction: CreateOutcomeTransaction;
};

export const OutcomeTransactionsInfo = ({ transaction }: TriggerProps) => {
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
      <S.InfoGroupContainer>
        <S.InfoGroup>
          <strong>Data</strong>
          <span>{format(new Date(transaction.date), "dd/MM/yyyy")}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Finaliza em</strong>
          <span>
            {" "}
            {transaction.installment == 1
              ? format(
                  addMonths(
                    new Date(transaction.date),
                    transaction.installment
                  ),
                  "dd/MM/yyyy"
                )
              : format(new Date(transaction.date), "dd/MM/yyyy")}
          </span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Descrição </strong>
          <span>{transaction.description}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Método </strong>
          <span>{transaction.method}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Tipo </strong>
          <span>{transaction.type}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Forma de pagamento </strong>
          <span>{transaction.paymentForm}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Parcela atual/ Parcelas </strong>
          <span>
            {CalculateActualInstallment(transaction.date)} /{" "}
            {transaction.installment}
          </span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Valor da parcela </strong>
          <span>
            {formatMonetary(transaction.value / transaction.installment)}
          </span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Valor da compra </strong>
          <span>{formatMonetary(transaction.value)}</span>
        </S.InfoGroup>
        <S.InfoGroup>
          <strong>Valor restante </strong>
          <span>
            {formatMonetary(
              transaction.value -
                (transaction.value / transaction.installment) *
                  CalculateActualInstallment(transaction.date)
            )}
          </span>
        </S.InfoGroup>
      </S.InfoGroupContainer>
    </S.Content>
  );
};
