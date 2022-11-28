import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeEntrada';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useState } from 'react';
import { DialogComponent } from '../components/Dialog';

type IncomeValuesProps = {
  id: string;
  data: string;
  description: string;
  origin: string;
  value: number;
}[];

export default function ValoresDeEntrada() {
  const [incomeValues, setIncomeValues] = useState<IncomeValuesProps>([
    {
      id: '1',
      data: '10/11/2022',
      description: 'Salario',
      origin: 'Unicred',
      value: 2000,
    },
    {
      id: '2',
      data: '11/11/2022',
      description: 'FreeLancer',
      origin: 'FreeLancer',
      value: 1000,
    },
    {
      id: '3',
      data: '12/11/2022',
      description: 'Bico',
      origin: 'LGPD',
      value: 50,
    },
  ]);

  const incomeTotal = () => {
    const total = incomeValues.reduce((acc, income) => {
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
