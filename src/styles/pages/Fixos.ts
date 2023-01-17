import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginTop: '3rem',
  gap: '3rem',
  padding: '5rem 4rem 0',
  width: '100%',
});

export const ElementsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});

export const CardsContainer = styled('div', {
  display: 'flex',
  gap: '2rem',
});

export const FixedValuesTable = styled('table', {
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

export const TransactionType = styled('span', {
  borderRadius: '20px',
  padding: '5px',

  fontSize: '$md',

  variants: {
    transactionType: {
      income: {
        border: ' 1px solid $green600',
        '&:not(:disabled):hover': {
          transition: 'background-color 0.2s',
        },
        color: '$green500',
      },
      outcome: {
        border: ' 1px solid $red100',
        '&:not(:disabled):hover': {
          transition: 'background-color 0.2s',
        },
        color: '$red100',
      },
    },
  },
});

export const TransactionValue = styled('span', {
  variants: {
    transactionType: {
      income: {
        color: '$green500',
      },
      outcome: {
        color: '$red100',
      },
    },
  },
});

export const VariantSubTotal = styled('h2', {
  variants: {
    subTotalType: {
      positive: {
        color: '$green500',
      },
      negative: {
        color: '$red100',
      },
    },
  },
});
