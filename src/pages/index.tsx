import { useState } from 'react';
import Summary from '../components/Summary';
import * as S from '../styles/pages/index';

export default function Home() {
  return (
    <S.Container>
      <S.MonthSelectorContainer>
        <h2>Selecione o mês de análise</h2>
        <input type="month" name="analisysDate" id="analisysDate" />
      </S.MonthSelectorContainer>
      <Summary />
    </S.Container>
  );
}
