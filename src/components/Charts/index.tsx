import { useContext } from 'react'
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
import { getColors, totalOutcomeTypes } from '../../utils/ChartUtils'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export default function Charts() {
  const { loading, outcomeValues } = useContext(TransactionsContext)
  const colors = getColors(outcomeValues)
  return (
    <S.ChartsContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.ChartContainer>
            <h1>Tipos de gastos referente a este mês:</h1>
            <PieChart width={430} height={430}>
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
                {totalOutcomeTypes(outcomeValues).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </S.ChartContainer>
          {/* <S.ChartContainer>
            <BarChart
              width={700}
              height={455}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </S.ChartContainer> */}
        </>
      )}
    </S.ChartsContainer>
  )
}
