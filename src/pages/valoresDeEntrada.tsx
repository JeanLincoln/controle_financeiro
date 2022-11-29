import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeEntrada';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';

type IncomeValuesProps = {
  id: string;
  data: string;
  description: string;
  origin: string;
  value: number;
}[];

export default function ValoresDeEntrada() {
  const { incomeValues, incomeTotal } = useContext(TransactionsContext);
  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector />
        <Card>
          <div>
            <span>Entradas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{incomeTotal()}</h2>
        </Card>
        <DialogComponent type="income" triggerText="Novo Valor de Entrada" />
      </S.ElementsContainer>
      <S.IncomeValuesTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Procedência</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {incomeValues.map(({ id, data, description, origin, value }) => {
            return (
              <tr key={id}>
                <td>{data}</td>
                <td>{description}</td>
                <td>{origin}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    value
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.IncomeValuesTable>
    </S.Container>
  );
}
