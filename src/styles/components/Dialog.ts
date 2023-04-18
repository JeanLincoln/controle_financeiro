import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from '..'

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
  },
})

// style={{ border: errors.initialDate ? '2px solid red' : 'initial' }}
// {errors.initialDate && <S.ErrorMessage>{errors.initialDate.message}</S.ErrorMessage>}

export const RadioGroupRoot = styled(RadioGroup.Root, {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  margiTop: '0.5rem',
  borderRadius: '10px',
  padding: '.5rem',
})

export const RadioGroupItem = styled(RadioGroup.Item, {
  background: '$gray700',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  borderRadius: 6,
  cursor: 'pointer',
  border: 0,
  color: '$gray300',

  '&[data-state="unchecked"]:hover ': {
    background: '$gray500',
  },
  '&[data-state="checked"]': {
    color: 'white',
    svg: {
      color: 'white',
    },
  },

  variants: {
    transactionType: {
      Entrada: {
        svg: {
          color: '$green600',
        },
        '&[data-state="checked"]': {
          background: '$green300',
        },
      },
      Saída: {
        svg: {
          color: '$red200',
        },
        '&[data-state="checked"]': {
          background: '$red100',
        },
      },
    },
  },
})

export const Title = styled(Dialog.Title, {
  textAlign: 'center',
  fontSize: '$2xl',
})

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  label: {
    fontSize: '$lg',
  },

  input: {
    '&::-webkit-calendar-picker-indicator': {
      backgroundColor: 'white',
      padding: '5px',
      cursor: 'pointer',
      borderRadius: '10px',
    },
  },

  'input,select': {
    fontSize: '$lg',
    borderRadius: 6,
    border: 0,
    background: '$gray700',
    color: '$gray300',
    padding: '2rem',
    width: '50rem',
    height: '5rem',
  },

  span: {
    fontSize: '$md',
    marginLeft: '1rem',
    alignSelf: 'center',
  },
})

export const TypeButton = styled('button', {
  height: 58,
  border: '0',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$lg',
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
      fixed: {
        background: '#b37400',
        '&:not(:disabled):hover': {
          background: '#d89c2c',
          transition: 'background-color 0.2s',
        },
      },
    },
  },
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  backougrnd: 'transparent',
  border: 0,
  top: '2.25rem',
  right: '1.5rem',
  lineHeight: '0%',
  cursor: 'pointer',
  color: '$gray300',
})

export const ErrorMessage = styled('span', {
  fontSize: '1.1rem',
  color: '$red100',
  fontWeight: 'bold',
})
