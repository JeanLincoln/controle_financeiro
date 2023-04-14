import { styled } from '..'

export const FiltersContainers = styled('div', {
  display: 'flex',
  border: '1px solid $gray400',
  borderRadius: '10px',
  justifyContent: 'flex-start',

  height: '10rem',
  padding: '2rem',
  gap: '1rem',
})

export const ItemGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  label: {
    fontSize: '$md',
    margin: '0 0 .5rem .5rem',
  },

  input: {
    padding: '1rem',
    border: 'none',
    borderRadius: 8,
    fontSize: '$lg',
    color: '$gray100',

    backgroundColor: '$gray700',

    '&[type=date]': {
      padding: '1rem',
      border: 'none',
      borderRadius: 8,
      fontSize: '$lg',
      color: '$gray100',

      backgroundColor: '$gray700',

      '&::-webkit-calendar-picker-indicator': {
        backgroundColor: '$gray200',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '10px',
      },

      '&::-webkit-datetime-edit': { padding: '1rem' },
      '&::-webkit-datetime-edit-text': { color: '$gray100', padding: '0 .5rem' },
    },
  },

  select: {
    padding: '1rem',
    border: 'none',
    borderRadius: 8,
    fontSize: '$lg',
    color: '$gray100',

    backgroundColor: '$gray700',
  },
})
