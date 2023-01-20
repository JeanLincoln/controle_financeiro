import { Card } from '../components/Card';
import * as S from '../styles/pages/Saidas';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';
import { format, differenceInMonths, addMonths } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';

export default function ValoresDeSaida() {
  const { outcomeValues, fixedOutcomeTotal, monthlyOutcomeTotal, deleteTransaction, filterMonth } =
    useContext(TransactionsContext);
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
        <DialogComponent type="outcome" triggerText="Novo Valor de Saída" />
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
          {currentItens.map(
            ({ id, date, description, method, type, paymentForm, installment, value }) => {
              return (
                <tr key={id}>
                  <td>{format(new Date(date), 'dd/MM/yyyy')}</td>
                  <td>
                    {installment !== 1
                      ? format(addMonths(new Date(date), installment), 'dd/MM/yyyy')
                      : format(new Date(date), 'dd/MM/yyyy')}
                  </td>
                  <td>{description}</td>
                  <td>{method}</td>
                  <td>{type}</td>
                  <td>{paymentForm}</td>
                  <td>{installment}</td>
                  <td>{CalculateActualInstallment(date)}</td>
                  <td>{formatMonetary(value / installment)}</td>
                  <td>{formatMonetary(value)}</td>
                  <td>
                    {formatMonetary(
                      value - (value / installment) * CalculateActualInstallment(date)
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteTransaction('outcome', id);
                      }}
                    >
                      <P.Trash size={32} />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
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
