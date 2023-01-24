import { Card } from '../components/Card';
import * as S from '../styles/pages/Saidas';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { NewTransactionForm } from '../components/Dialog/NewTransaction';
import { format, differenceInMonths, addMonths } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction';

export default function ValoresDeSaida() {
  const {
    outcomeValues,
    fixedOutcomeTotal,
    monthlyOutcomeTotal,
    deleteTransaction,
    updateTransaction,
    filterMonth,
  } = useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = outcomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(FilterMonthDate(filterMonth), TransactionDate(date));

    return datesDifference + 1;
  };

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector setCurrentPage={setCurrentPage} />
        <Card>
          <div>
            <span>Saídas Fixas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(fixedOutcomeTotal())}</h2>
        </Card>
        <P.PlusCircle size={32} />
        <Card>
          <div>
            <span>Saídas Mensais</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(monthlyOutcomeTotal())}</h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(fixedOutcomeTotal() + monthlyOutcomeTotal())}</h2>
        </Card>
        <NewTransactionForm method="post" type="outcome" triggerText="Novo Valor de Saída" />
      </S.ElementsContainer>
      <S.OutputValuesTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Finaliza em</th>
            <th>Descrição</th>
            <th>Método</th>
            <th>Tipo</th>
            <th>Forma de pagamento</th>
            <th>Parcelas</th>
            <th>Parcela Atual</th>
            <th>Valor da parcela</th>
            <th>Valor da compra</th>
            <th>Valor restante da compra</th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{format(new Date(transaction.date), 'dd/MM/yyyy')}</td>
                <td>
                  {transaction.installment !== 1
                    ? format(
                        addMonths(new Date(transaction.date), transaction.installment),
                        'dd/MM/yyyy'
                      )
                    : format(new Date(transaction.date), 'dd/MM/yyyy')}
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.method}</td>
                <td>{transaction.type}</td>
                <td>{transaction.paymentForm}</td>
                <td>{transaction.installment}</td>
                <td>{CalculateActualInstallment(transaction.date)}</td>
                <td>{formatMonetary(transaction.value / transaction.installment)}</td>
                <td>{formatMonetary(transaction.value)}</td>
                <td>
                  {formatMonetary(
                    transaction.value -
                      (transaction.value / transaction.installment) *
                        CalculateActualInstallment(transaction.date)
                  )}
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteTransaction('outcome', transaction.id);
                    }}
                  >
                    <P.Trash size={25} />
                  </button>
                </td>
                <td>
                  <UpdateTransactionForm method="put" type="outcome" transaction={transaction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.OutputValuesTable>
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={outcomeValues.length}
        paginate={paginate}
      />
    </S.Container>
  );
}
