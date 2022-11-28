import { styled } from '..';

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: '$gray700',
  padding: '0 16rem',

  height: '21.2rem',
});

export const LogoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  gap: '2rem',

  svg: {
    color: '$green500',
  },

  h1: {
    fontSize: '$3xl',
  },
});

export const LinksContainer = styled('ul', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyle: 'none',
  letterSpacing: '0.4rem',

  gap: '4rem',

  fontSize: '$lg',

  a: {
    textDecoration: 'none',
    color: '$gray200',
  },
});

export const UserContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  gap: '2rem',

  img: {
    borderRadius: '50%',
  },

  strong: {
    fontSize: '$lg',
  },
});
