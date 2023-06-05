import * as S from "../../../styles/components/TransactionsItems/FixedValuesItem";
import * as P from "phosphor-react";
import { CreateFixedValues } from "../../../types/TransactionTypes";
import { format } from "date-fns";
import { useContext } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { UpdateTransactionForm } from "../../Dialog/UpdateTransaction";
import { formatMonetary } from "../../../utils/FormatMonetaryValues";

type FixedValuesItem = {
  currentItens: CreateFixedValues[];
};

export default function FixedValuesItem({ currentItens }: FixedValuesItem) {
  const { deleteTransaction } = useContext(TransactionsContext);

  return (
    <S.TransactionsContainer>
      {currentItens.map((transaction) => {
        return (
          <S.TransactionContainer key={transaction.id}>
            <S.TransactionsInfosContainer>
              <S.TransactionInfoGroup>
                <strong>Data</strong>
                <span>
                  {format(new Date(transaction.initialDate), "dd/MM/yyyy")}
                </span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Data Final</strong>
                <span>
                  {new Date(transaction.finalDate).getFullYear() !== 9999
                    ? format(new Date(transaction.finalDate), "dd/MM/yyyy")
                    : "Não determinado"}
                </span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Descrição </strong>
                <span>{transaction.description}</span>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Tipo </strong>
                <S.TransactionType
                  transactionType={
                    transaction.type === "Entrada" ? "income" : "outcome"
                  }
                >
                  {transaction.type}
                </S.TransactionType>
              </S.TransactionInfoGroup>
              <S.TransactionInfoGroup>
                <strong>Valor </strong>
                <S.TransactionValue
                  transactionType={
                    transaction.type === "Entrada" ? "income" : "outcome"
                  }
                >
                  {formatMonetary(transaction.value)}
                </S.TransactionValue>
              </S.TransactionInfoGroup>
            </S.TransactionsInfosContainer>
            <button
              className="delete"
              onClick={() => {
                deleteTransaction("fixed", transaction.id);
              }}
            >
              <P.Trash size={30} />
            </button>

            <UpdateTransactionForm
              method="put"
              type="fixed"
              transaction={transaction}
            />
          </S.TransactionContainer>
        );
      })}
    </S.TransactionsContainer>
  );
}
