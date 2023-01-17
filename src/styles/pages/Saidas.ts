import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginTop: '3rem',
  gap: '3rem',
  padding: '5rem 4rem 0',
  width: '100%',
});

export const OutputValuesTable = styled('table', {
  textAlign: 'center',

  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 0.5rem',
  marginTop: '1rem',

  fontSize: '$lg',

  td: {
    padding: '1.25rem 3rem',
    backgroundColor: '$gray700',

    '&:first-child': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    '&:last-child': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      color: '$red100',
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

export const ElementsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const SetIncomeTransactionButton = styled('button', {
  padding: '3rem',
  height: '1rem',
  borderRadius: 8,
  border: 'none',
  backgroundColor: '$red200',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$xl',
  cursor: 'pointer',
  lineHeight: 0,
});
