import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  marginTop: '5rem',
  gap: '3rem',

  maxWidth: 1120,
  margin: '3rem auto 0',
});

export const ElementsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const IncomeValuesTable = styled('table', {
  textAlign: 'center',

  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 0.5rem',
  marginTop: '1rem',

  fontSize: '$lg',

  td: {
    padding: '1.25rem 2rem',
    backgroundColor: '$gray700',

    '&:first-child': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    '&:last-child': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      color: '$green500',
    },

    button: {
      backgroundColor: 'transparent',
      border: 'none',
      svg: {
        color: '$gray300',
        cursor: 'pointer',
        '&:hover': {
          color: '$red100',
        },
      },
    },
  },
});
