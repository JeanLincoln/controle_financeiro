import { Card } from '../components/Card';
import * as S from '../styles/pages/Fixos';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';

export default function ValoresDeEntrada() {
  const { fixedValues } = useContext(TransactionsContext);

  const FormatValue = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const FixedSubTotal = (type: string) => {
    if (type === 'incomes') {
      const fixedIncomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Entrada' ? (acc += fixedValue.value) : (acc += 0);
        return acc;
      }, 0);
      return FormatValue(fixedIncomeSubTotal);
    } else {
      const fixedOutcomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Saída' ? (acc += fixedValue.value) : (acc += 0);
        return acc;
      }, 0);
      return FormatValue(fixedOutcomeSubTotal);
    }
  };

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
        <DialogComponent type="fixed" triggerText="Novo Valor Fixo" />
      </S.ElementsContainer>
      <S.FixedValuesTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {fixedValues.map(({ description, type, value }, index) => {
            return (
              <tr key={index}>
                <td>{description}</td>
                <td>
                  <S.TransactionType transactionType={type === 'Entrada' ? 'income' : 'outcome'}>
                    {type}
                  </S.TransactionType>
                </td>
                <td>
                  <S.TransactionValue transactionType={type === 'Entrada' ? 'income' : 'outcome'}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      value
                    )}
                  </S.TransactionValue>
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.FixedValuesTable>
    </S.Container>
  );
}
