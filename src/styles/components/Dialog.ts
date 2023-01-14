import { styled } from '..';
import * as Dialog from '@radix-ui/react-dialog';

export const SetIncomeTransactionButton = styled('button', {
  padding: '3rem',
  height: '1rem',
  borderRadius: 8,
  border: 'none',
  backgroundColor: '$green500',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$xl',
  cursor: 'pointer',
  lineHeight: 0,

  variants: {
    transactionType: {
      income: {
        background: '$green600',
        '&:not(:disabled):hover': {
          background: '$green500',
          transition: 'background-color 0.2s',
        },
      },
      outcome: {
        background: '$red200',
        '&:not(:disabled):hover': {
          background: '$red100',
          transition: 'background-color 0.2s',
        },
      },
    },
  },
});

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100%',
  height: '100%',
  inset: 0,
  background: 'rgba(0,0,0,0.75)',
});

export const Content = styled(Dialog.Content, {
  minWidth: '50rem',
  borderRadius: 6,
  padding: '2.5rem 3rem',
  background: '$gray600',

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',

  form: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    'input, select': {
      borderRadius: 6,
      border: 0,
      background: '$gray700',
      color: '$gray300',
      padding: '2rem',
    },
  },
});

export const TypeButton = styled('button', {
  height: 58,
  border: '0',
  color: '$white',
  fontWeight: 'bold',
  padding: '0 1.25rem',
  borderRadius: 6,
  marginTop: '1.5rem',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  variants: {
    transactionType: {
      income: {
        background: '$green600',
        '&:not(:disabled):hover': {
          background: '$green500',
          transition: 'background-color 0.2s',
        },
      },
      outcome: {
        background: '$red200',
        '&:not(:disabled):hover': {
          background: '$red100',
          transition: 'background-color 0.2s',
        },
      },
    },
  },
});

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  backougrnd: 'transparent',
  border: 0,
  top: '2.25rem',
  right: '1.5rem',
  lineHeight: '0%',
  cursor: 'pointer',
  color: '$gray300',
});
