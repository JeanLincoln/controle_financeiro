import { Card } from '../components/Card';
import * as S from '../styles/pages/Fixos';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';
import { format } from 'date-fns';
import { formatMonetary } from '../utils/FormatMonetaryValues';

export default function ValoresDeEntrada() {
  const { fixedValues, deleteTransaction } = useContext(TransactionsContext);

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
            <th>Data de inicio</th>
            <th>Data de fim</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {fixedValues.map(({ id, initialDate, finalDate, description, type, value }, index) => {
            return (
              <tr key={index}>
                <td>{format(new Date(initialDate), 'dd/MM/yyyy')}</td>
                <td>{finalDate ? format(new Date(finalDate), 'dd/MM/yyyy') : 'Não determinado'}</td>
                <td>{description}</td>
                <td>
                  <S.TransactionType transactionType={type === 'Entrada' ? 'income' : 'outcome'}>
                    {type}
                  </S.TransactionType>
                </td>
                <td>
                  <S.TransactionValue transactionType={type === 'Entrada' ? 'income' : 'outcome'}>
                    {formatMonetary(value)}
                  </S.TransactionValue>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteTransaction('fixed', id);
                    }}
                  >
                    <P.Trash size={32} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.FixedValuesTable>
    </S.Container>
  );
}
