import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeSaida';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';
import { format, differenceInMonths, addMonths } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';

export default function ValoresDeSaida() {
  const { outcomeValues, outcomeTotal, deleteTransaction, filterMonth } =
    useContext(TransactionsContext);

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(FilterMonthDate(filterMonth), TransactionDate(date));

    return datesDifference === 0 ? 1 : datesDifference + 1;
  };

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector />
        <Card>
          <div>
            <span>Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{outcomeTotal()}</h2>
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
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {outcomeValues.map(
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
                  <td>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      value
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
    </S.Container>
  );
}
