import { styled } from '..'

export const ChartsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '$gray400',
  boxShadow: '-5px 5px 5px #121214',
  borderRadius: 10,
  margin: '50px 50px 0 50px',
  padding: '20px 0',
})

export const ChartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5rem 1rem 0px',

  '.recharts-legend-wrapper': {
    display: 'flex',
    justifyContent: 'center',
  },

  h1: {
    marginBottom: 10,
  },

  p: {
    fontSize: '$md',
    borderRadius: 10,
    backgroundColor: '$gray700',
    padding: '1rem',
  },

  ul: {
    fontSize: '$md',
    backgroundColor: '$gray600',
    padding: '1rem !important',
    borderRadius: 10,
  },
})
