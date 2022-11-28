import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeSaida';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useState } from 'react';
import { DialogComponent } from '../components/Dialog';

type OutcomeValuesProps = {
  id: string;
  data: string;
  description: string;
  method: string;
  type: string;
  value: number;
}[];

export default function ValoresDeSaida() {
  const [outcomeValues, setOutcomeValues] = useState<OutcomeValuesProps>([
    {
      id: '1',
      data: '10/11/2022',
      description: 'Hamburguer',
      method: 'Pix',
      type: 'Comida',
      value: 30,
    },
    {
      id: '2',
      data: '11/11/2022',
      description: 'No Mans sky',
      method: 'Credit Card',
      type: 'Jogo',
      value: 100,
    },
    {
      id: '3',
      data: '12/11/2022',
      description: 'Ryzen 5 5500',
      method: 'Credit Card',
      type: 'Eletronic',
      value: 1200,
    },
  ]);

  const outcomeTotal = () => {
    const total = outcomeValues.reduce((acc, income) => {
      acc = acc += income.value;
      return acc;
    }, 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
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
            <th>Descrição</th>
            <th>Método</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {outcomeValues.map(({ id, data, description, method, type, value }) => {
            return (
              <tr key={id}>
                <td>{data}</td>
                <td>{description}</td>
                <td>{method}</td>
                <td>{type}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    value
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.OutputValuesTable>
    </S.Container>
  );
}
