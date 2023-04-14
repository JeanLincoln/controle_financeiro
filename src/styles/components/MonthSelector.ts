import { styled } from '..'

export const MonthSelectorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  marginTop: '2rem',
  gap: '1.5rem',

  input: {
    padding: '1rem',
    border: 'none',
    borderRadius: 8,
    fontSize: '$lg',
    color: '$gray100',

    backgroundColor: '$gray700',

    '&::-webkit-calendar-picker-indicator': {
      backgroundColor: 'white',
      padding: '5px',
      cursor: 'pointer',
      borderRadius: '10px',
    },
  },

  h2: {
    fontSize: '$xl',
  },
})
