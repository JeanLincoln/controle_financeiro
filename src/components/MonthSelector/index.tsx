import {} from 'date-fns';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import * as S from '../../styles/components/MonthSelector';
export function MonthSelector() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const handleChangeMonth = (e) => {
    const chosenMonth = new Date(e.target.value);
    chosenMonth.setDate(chosenMonth.getDate() + 1);
    fetchTransactions(chosenMonth);
  };

  return (
    <S.MonthSelectorContainer>
      <h2>Selecione o mês de análise</h2>
      <input
        onChange={handleChangeMonth}
        type="month"
        name="analisysDate"
        id="analisysDate"
        lang="pt-BR"
      />
    </S.MonthSelectorContainer>
  );
}
