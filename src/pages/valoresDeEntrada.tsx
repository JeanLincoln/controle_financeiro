import { Card } from '../components/Card';
import * as S from '../styles/pages/valoresDeEntrada';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';

export default function ValoresDeEntrada() {
  return (
    <S.Container>
      <MonthSelector />
      <Card>
        <div>
          <span>Entradas</span>
          <P.ArrowCircleUp size={32} color="#00b37e" />
        </div>
        <h2>R$ 17.400,00</h2>
      </Card>
      <S.EntryValuesTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Procedência</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/11/2022</td>
            <td>Salario</td>
            <td>Unicred</td>
            <td>R$ 2.000,00</td>
          </tr>
          <tr>
            <td>10/11/2022</td>
            <td>Salario</td>
            <td>Unicred</td>
            <td>R$ 2.000,00</td>
          </tr>
          <tr>
            <td>10/11/2022</td>
            <td>Salario</td>
            <td>Unicred</td>
            <td>R$ 2.000,00</td>
          </tr>
          <tr>
            <td>10/11/2022</td>
            <td>Salario</td>
            <td>Unicred</td>
            <td>R$ 2.000,00</td>
          </tr>
        </tbody>
      </S.EntryValuesTable>
    </S.Container>
  );
}
