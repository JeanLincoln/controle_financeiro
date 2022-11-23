import { styled } from '..';

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  placeItems: 'center',
  padding: '5rem 16rem 0',
  gap: '3.5rem',
});

export const SummaryCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '30rem',
  minHeight: '13rem',
  padding: '3.2rem',
  borderRadius: 8,

  backgroundColor: '$gray400',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '1rem',
  },

  span: {
    fontSize: '$md',
  },

  h2: {
    fontWeight: 'bold',
    fontSize: '$2xl',
  },
});
