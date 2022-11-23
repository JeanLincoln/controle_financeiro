import * as S from '../../styles/components/Summary';
import * as P from 'phosphor-react';

export default function Summary() {
  return (
    <S.Container>
      <S.SummaryCard>
        <div>
          <span>Entradas</span>
          <P.ArrowCircleUp size={32} color="#00b37e" />
        </div>
        <h2>R$ 17.400,00</h2>
      </S.SummaryCard>
      <S.SummaryCard>
        <div>
          <span>Saídas</span>
          <P.ArrowCircleDown size={32} color="#f75a68" />
        </div>
        <h2>R$ 17.400,00</h2>
      </S.SummaryCard>
      <S.SummaryCard>
        <div>
          <span>Total</span>
          <P.CurrencyDollar size={32} color="#fff" />
        </div>
        <h2>R$ 17.400,00</h2>
      </S.SummaryCard>
      <S.SummaryCard>
        <div>
          <span>Sobras</span>
          <P.Wallet size={32} color="#00887f" />
        </div>
        <h2>R$ 17.400,00</h2>
      </S.SummaryCard>
    </S.Container>
  );
}
