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
      fixed: {
        background: '#b37400',
        '&:not(:disabled):hover': {
          background: '#d89c2c',
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
