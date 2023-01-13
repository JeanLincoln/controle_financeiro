import * as S from '../../styles/components/Summary';
import * as P from 'phosphor-react';
import { Card } from '../Card';
import { MonthSelector } from '../MonthSelector';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export default function Summary() {
  const { incomeTotal, outcomeTotal, pickings } = useContext(TransactionsContext);

  return (
    <>
      <MonthSelector />
      <S.Container>
        <Card>
          <div>
            <span>Entradas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{incomeTotal()}</h2>
        </Card>
        <Card>
          <div>
            <span>Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{outcomeTotal()}</h2>
        </Card>
        {/* <Card>
          <div>
            <span>Total</span>
            <P.CurrencyDollar size={32} color="#fff" />
          </div>
          <h2>{}</h2>
        </Card> */}
        <Card>
          <div>
            <span>Sobras</span>
            <P.Wallet size={32} color="#00887f" />
          </div>
          <h2>{pickings()}</h2>
        </Card>
      </S.Container>
    </>
  );
}
