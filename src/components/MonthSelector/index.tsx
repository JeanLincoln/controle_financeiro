import * as S from '../../styles/components/MonthSelector';
export function MonthSelector() {
  return (
    <S.MonthSelectorContainer>
      <h2>Selecione o mês de análise</h2>
      <input type="month" name="analisysDate" id="analisysDate" lang="pt-BR" />
    </S.MonthSelectorContainer>
  );
}
