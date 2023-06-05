import * as S from "../../../styles/components/TransactionsItems/IncomeTransactionItem";
import * as P from "phosphor-react";
import { CreateIncomeTransaction } from "../../../types/TransactionTypes";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { UpdateTransactionForm } from "../../Dialog/UpdateTransaction";
import { formatMonetary } from "../../../utils/FormatMonetaryValues";

type IncomeTransactionItem = {
  currentItens: CreateIncomeTransaction[];
};

export default function IncomeTransactionItem({
  currentItens,
}: IncomeTransactionItem) {
  const { deleteTransaction } = useContext(TransactionsContext);

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
                <strong>Procedência </strong>
                <span>{transaction.origin}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Valor </strong>
                <span>{formatMonetary(transaction.value)}</span>
              </S.TransactionInfoGroup>
            </S.TransactionsInfosContainer>
            <button
              className="delete"
              onClick={() => {
                deleteTransaction("income", transaction.id);
              }}
            >
              <P.Trash size={30} />
            </button>

            <UpdateTransactionForm
              method="put"
              type="income"
              transaction={transaction}
            />
          </S.TransactionContainer>
        );
      })}
    </S.TransactionsContainer>
  );
}
