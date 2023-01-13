import { ChangeEvent, useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import * as S from '../../styles/components/MonthSelector';

export function MonthSelector() {
  const { filterMonth, fetchTransactions, setFilterMonth } = useContext(TransactionsContext);
  console.log(filterMonth);

  const handleChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const chosenMonth = new Date(e.target.value);
    chosenMonth.setDate(chosenMonth.getDate() + 1);
    setFilterMonth(
      `${chosenMonth.getFullYear()}-${
        chosenMonth.getMonth() + 1 > 9
          ? chosenMonth.getMonth() + 1
          : `0${chosenMonth.getMonth() + 1}`
      }`
    );
  };

  return (
    <S.MonthSelectorContainer>
      <h2>Selecione o mês de análise</h2>
      <input
        onChange={handleChangeMonth}
        value={filterMonth}
        type="month"
        name="analisysDate"
        id="analisysDate"
        lang="pt-BR"
      />
    </S.MonthSelectorContainer>
  );
}
