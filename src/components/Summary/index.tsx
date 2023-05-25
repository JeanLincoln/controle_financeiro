import * as S from "../../styles/components/Summary";
import * as P from "phosphor-react";
import { Card } from "../Card";
import { MonthSelector } from "../MonthSelector";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { formatMonetary } from "../../utils/FormatMonetaryValues";
import { Loading } from "../Loading";

export default function Summary() {
  const {
    loading,
    monthlyIncomeTotal,
    monthlyOutcomeTotal,
    fixedIncomeTotal,
    fixedOutcomeTotal,
  } = useContext(TransactionsContext);

  const pickings = () =>
    monthlyIncomeTotal() +
    fixedIncomeTotal() -
    (monthlyOutcomeTotal() + fixedOutcomeTotal());

  return (
    <>
      <MonthSelector />
      <S.Container>
        <Card>
          <div>
            <span>Entradas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>
            {loading ? (
              <Loading />
            ) : (
              <S.TransactionsDetails>
                {formatMonetary(fixedIncomeTotal() + monthlyIncomeTotal())}
                <span>
                  Fixas: {formatMonetary(fixedIncomeTotal())} + Pontuais:{" "}
                  {formatMonetary(monthlyIncomeTotal())}
                </span>
              </S.TransactionsDetails>
            )}
          </h2>
        </Card>
        <Card>
          <div>
            <span>Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>
            {loading ? (
              <Loading />
            ) : (
              <S.TransactionsDetails>
                {formatMonetary(fixedOutcomeTotal() + monthlyOutcomeTotal())}
                <span>
                  Fixas: {fixedOutcomeTotal()} + Pontuais:{" "}
                  {formatMonetary(monthlyOutcomeTotal())}
                </span>
              </S.TransactionsDetails>
            )}
          </h2>
        </Card>
        <Card>
          <div>
            <span>Saldo</span>
            <P.Wallet size={32} color="#00887f" />
          </div>
          <h2
            style={
              formatMonetary(pickings()).includes("-")
                ? { color: "#f75a68" }
                : { color: "#00b37e" }
            }
          >
            {loading ? <Loading /> : formatMonetary(pickings())}
          </h2>
        </Card>
      </S.Container>
    </>
  );
}
