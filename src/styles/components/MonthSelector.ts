import { styled } from '..';

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
  },

  h2: {
    fontSize: '$xl',
  },
});
