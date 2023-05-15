import { BarChart, PieChart } from 'recharts'
import { styled } from '..'

export const ChartsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '$gray400',
  boxShadow: '-5px 5px 5px #121214',
  borderRadius: 10,
  height: '70rem',
  margin: '50px 50px 0 50px',
  padding: '1rem 1rem 1rem',
  marginBottom: '5rem',
})

export const ChartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 1rem 5rem',

  '.recharts-wrapper': {
    width: '100%',
    height: '100%',
    padding: '3rem 0',
  },

  '.recharts-legend-wrapper': {
    position: 'initial !important',
    top: '-5rem',
  },

  h1: {
    margin: '1rem 0',
  },

  p: {
    fontSize: '$md',
    borderRadius: 10,
    backgroundColor: '$gray700',
    padding: '1rem',
  },

  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '$md',
    backgroundColor: '$gray600',
    padding: '1rem !important',
    borderRadius: 10,
  },

  li: {
    margin: '1rem',
  },
})

export const BarChartContainer = styled(BarChart, {
  svg: {
    backgroundColor: '$gray500',
    border: '1px solid $gray300',
    borderRadius: 10,
    padding: '1rem',
    marginBottom: '2rem',
  },
})

export const PieChartContainer = styled(PieChart, {
  svg: {
    '&[cx]': {
      backgroundColor: '$gray500',
      border: '1px solid $gray300',
      borderRadius: 10,
      padding: '1rem',
      marginBottom: '2rem',
    },
  },
})
