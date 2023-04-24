import { styled } from '..'

export const ChartsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '$gray400',
  borderRadius: 10,
  margin: '50px 50px 0 50px',
  padding: '20px 0',
})

export const ChartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5rem 3rem 0px',

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
