import { styled } from '..';

export const PaginationContainer = styled('nav', {
  display: 'flex',
});

export const PaginationList = styled('ul', {
  display: 'flex',
  listStyle: 'none',

  justifyContent: 'flex-end',

  width: '100%',

  gap: '1rem',

  button: {
    border: 'none',
    padding: '1rem 1.5rem',
    borderRadius: '10px',

    background: '$gray700',
    color: '$gray100',

    cursor: 'pointer',

    '&.active': {
      background: '$gray500',
    },

    '&:hover': {
      transition: 'background ease .3s',
      background: '$gray500',
    },
  },
});
