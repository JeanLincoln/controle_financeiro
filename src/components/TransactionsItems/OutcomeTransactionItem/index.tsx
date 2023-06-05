import * as S from "../../../styles/components/TransactionsItems/OutcomeTransactionItem";
import * as P from "phosphor-react";
import { CreateOutcomeTransaction } from "../../../types/TransactionTypes";
import { addMonths, differenceInMonths, format } from "date-fns";
import {
  FilterMonthDate,
  TransactionDate,
} from "../../../utils/DatesValidation";
import { useContext, useState } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { formatMonetary } from "../../../utils/FormatMonetaryValues";
import { UpdateTransactionForm } from "../../Dialog/UpdateTransaction";
import { OutcomeTransactionsInfo } from "../../Dialog/OutcomeTransactionInfo";
import { TransactionInfo } from "../../Dialog/TransactionInfo";

type OutcomeTransactionItem = {
  currentItens: CreateOutcomeTransaction[];
};

export default function OutcomeTransactionItem({
  currentItens,
}: OutcomeTransactionItem) {
  const [open, setOpen] = useState(false);
  const { deleteTransaction, filterMonth } = useContext(TransactionsContext);

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(
      FilterMonthDate(filterMonth),
      TransactionDate(date)
    );

    return datesDifference + 1;
  };

  return (
    <S.TransactionsContainer>
      {currentItens.map((transaction) => {
        return (
          <S.TransactionContainer key={transaction.id}>
            <S.TransactionsInfosContainer>
              <S.TransactionInfoGroup>
                <strong>Data</strong>
                <span>{format(new Date(transaction.date), "dd/MM/yyyy")}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Descrição </strong>
                <span>{transaction.description}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Método </strong>
                <span>{transaction.method}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Tipo </strong>
                <span>{transaction.type}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Forma de pagamento </strong>
                <span>{transaction.paymentForm}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Parcela atual/ Parcelas </strong>
                <span>
                  {CalculateActualInstallment(transaction.date)} /{" "}
                  {transaction.installment}
                </span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Valor da compra </strong>
                <span>{formatMonetary(transaction.value)}</span>
              </S.TransactionInfoGroup>
            </S.TransactionsInfosContainer>

            <button
              className="delete"
              onClick={() => {
                deleteTransaction("outcome", transaction.id);
              }}
            >
              <P.Trash size={30} />
            </button>

            <UpdateTransactionForm
              method="put"
              type="outcome"
              transaction={transaction}
            />
            <TransactionInfo type="outcome" transaction={transaction} />
          </S.TransactionContainer>
        );
      })}
    </S.TransactionsContainer>
  );
}
