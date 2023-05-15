import { useContext, useEffect, useState } from 'react'
import * as S from '../../styles/components/Charts'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Loading } from '../Loading'
import { CustomTooltip } from './CustomTooltip'
import { fillCells, totalOutcomePerMonth, totalOutcomeTypes } from '../../utils/ChartUtils'

type outcomePerMonthProps = {
  name: string
  total: number
}

export default function Charts() {
  const { loading, outcomeValues } = useContext(TransactionsContext)
  const [outcomePerMonth, setOutcomePerMonth] = useState<outcomePerMonthProps[]>([])

  const fetchTotalOutcomePerMonth = async () => {
    const response = await totalOutcomePerMonth()
    setOutcomePerMonth(response)
  }

  useEffect(() => {
    fetchTotalOutcomePerMonth()
  }, [])

  return (
    <S.ChartsContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.ChartContainer>
            <h1>Tipos de gastos referente a este mês:</h1>
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
                {totalOutcomeTypes(outcomeValues).map((entry, index, array) => {
                  return <Cell key={`cell-${index}`} fill={fillCells(index, array)} />
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </S.PieChartContainer>
          </S.ChartContainer>
          <S.ChartContainer>
            <h1>Gastos x Mês em {new Date().getFullYear()}:</h1>
            <S.BarChartContainer width={800} height={430} data={outcomePerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="#8884d8" />
            </S.BarChartContainer>
          </S.ChartContainer>
        </>
      )}
    </S.ChartsContainer>
  )
}
