import { Card } from '../components/Card';
import * as S from '../styles/pages/Fixos';
import * as P from 'phosphor-react';
import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { NewTransactionForm } from '../components/Dialog/NewTransaction';
import { format } from 'date-fns';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction';

export default function ValoresDeEntrada() {
  const { fixedValues, deleteTransaction } = useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);

  const FixedSubTotal = (type: string) => {
    if (type === 'incomes') {
      const fixedIncomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Entrada' ? (acc += fixedValue.value) : (acc += 0);
        return acc;
      }, 0);
      return formatMonetary(fixedIncomeSubTotal);
    } else {
      const fixedOutcomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Saída' ? (acc += fixedValue.value) : (acc += 0);
        return acc;
      }, 0);
      return formatMonetary(fixedOutcomeSubTotal);
    }
  };

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = fixedValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <S.Container>
      <S.ElementsContainer>
        <S.CardsContainer>
          <Card>
            <div>
              <span>Entradas Fixas</span>
              <P.Infinity size={32} color="#00b37e" />
            </div>
            <S.VariantSubTotal subTotalType="positive">
              {FixedSubTotal('incomes')}
            </S.VariantSubTotal>
          </Card>
          <Card>
            <div>
              <span>Saídas Fixas</span>
              <P.Infinity size={32} color="#f75a68" />
            </div>
            <S.VariantSubTotal subTotalType="negative">
              - {FixedSubTotal('outcomes')}
            </S.VariantSubTotal>
          </Card>
        </S.CardsContainer>
        <NewTransactionForm method="post" type="fixed" triggerText="Novo Valor Fixo" />
      </S.ElementsContainer>
      <S.FixedValuesTable>
        <thead>
          <tr>
            <th>Data de inicio</th>
            <th>Data de fim</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map((transaction, index) => {
            return (
              <tr key={index}>
                <td>{format(new Date(transaction.initialDate), 'dd/MM/yyyy')}</td>
                <td>
                  {transaction.finalDate
                    ? format(new Date(transaction.finalDate), 'dd/MM/yyyy')
                    : 'Não determinado'}
                </td>
                <td>{transaction.description}</td>
                <td>
                  <S.TransactionType
                    transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                  >
                    {transaction.type}
                  </S.TransactionType>
                </td>
                <td>
                  <S.TransactionValue
                    transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                  >
                    {formatMonetary(transaction.value)}
                  </S.TransactionValue>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteTransaction('fixed', transaction.id);
                    }}
                  >
                    <P.Trash size={32} />
                  </button>
                </td>
                <td>
                  <UpdateTransactionForm method="put" type="fixed" transaction={transaction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.FixedValuesTable>
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={fixedValues.length}
        paginate={paginate}
      />
    </S.Container>
  );
}
