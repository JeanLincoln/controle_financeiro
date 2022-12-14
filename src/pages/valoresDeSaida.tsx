import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeSaida';
import * as P from 'phosphor-react';
import { dateFormatter } from '../utils/Formatter';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';

export default function ValoresDeSaida() {
  const { outcomeValues, outcomeTotal, deleteTransaction } = useContext(TransactionsContext);

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
            <th>Descrição</th>
            <th>Método</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {outcomeValues.map(({ id, date, description, method, type, value }) => {
            return (
              <tr key={id}>
                <td>{dateFormatter.format(new Date(date))}</td>
                <td>{description}</td>
                <td>{method}</td>
                <td>{type}</td>
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
          })}
        </tbody>
      </S.OutputValuesTable>
    </S.Container>
  );
}
