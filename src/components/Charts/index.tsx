import { useContext, useEffect, useState } from "react";
import * as S from "../../styles/components/Charts";
import * as P from "phosphor-react";
import {
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Loading } from "../Loading";
import { CustomTooltip } from "./CustomTooltip";
import {
  fillCells,
  totalOutcomePerMonth,
  totalOutcomeTypes,
} from "../../utils/ChartUtils";
import { AuthContext } from "../../contexts/AuthContext";

type outcomePerMonthProps = {
  name: string;
  total: number;
};

export default function Charts() {
  const { user } = useContext(AuthContext);
  const { loading, outcomeValues } = useContext(TransactionsContext);
  const [outcomePerMonth, setOutcomePerMonth] = useState<
    outcomePerMonthProps[]
  >([]);

  const fetchTotalOutcomePerMonth = async () => {
    if (user) {
      const response = await totalOutcomePerMonth(user.uid);
      setOutcomePerMonth(response);
    }
  };

  console.log(outcomePerMonth);

  useEffect(() => {
    fetchTotalOutcomePerMonth();
  }, []);

  return (
    <S.ChartsContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          {outcomeValues.length ? (
            <S.ChartContainer>
              <h3>Tipos de gasto neste mês</h3>
              <S.PieChartContainer width={430} height={430}>
                <Pie
                  data={totalOutcomeTypes(outcomeValues)}
                  nameKey="name"
                  dataKey="value"
                  cx={210}
                  cy={200}
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                >
                  {totalOutcomeTypes(outcomeValues).map(
                    (entry, index, array) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={fillCells(index, array)}
                        />
                      );
                    }
                  )}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </S.PieChartContainer>
            </S.ChartContainer>
          ) : (
            <S.NoTransactionsContainer>
              <P.MaskSad className="noTransactions" size={180} />
              <h3>Não existem gastos para o mês em analise!</h3>
            </S.NoTransactionsContainer>
          )}
          {outcomePerMonth.reduce((acc, month) => (acc += month.total), 0) ? (
            <S.ChartContainer>
              <h3>Gastos por mês no ano de {new Date().getFullYear()}</h3>
              <S.BarChartContainer
                width={800}
                height={430}
                data={outcomePerMonth}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#8884d8" />
              </S.BarChartContainer>
            </S.ChartContainer>
          ) : (
            <S.NoTransactionsContainer>
              <P.MaskSad className="noTransactions" size={180} />
              <h3>Não existem gastos para o ano em analise!</h3>
            </S.NoTransactionsContainer>
          )}
        </>
      )}
    </S.ChartsContainer>
  );
}
