import { styled } from '..';

export const AppContainer = styled('div', {
  display: 'flex',
  width: '100%',
});

export const AsideContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  backgroundColor: '$gray700',

  height: '100vh',
  padding: '3rem 2rem',
  gap: '8rem',
  width: '10rem',

  transition: 'all ease 0.2s',

  'h3,h1,strong': {
    display: 'none',
  },

  ul: {
    alignItems: 'center',
  },

  '&:hover': {
    width: '29rem',
    padding: '3rem 5rem',

    'h1,strong': {
      display: 'block',
    },

    h3: {
      display: 'inline-block',
    },

    ul: {
      alignItems: 'start',
    },
  },
});

export const LogoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'center',

  gap: '2rem',
  flex: 1,

  svg: {
    color: '$green500',
  },

  h1: {
    fontSize: '$2xl',
  },

  a: {
    textDecoration: 'none',
    color: '$gray200',
  },
});

export const LinksContainer = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  listStyle: 'none',

  letterSpacing: '0.2rem',
  lineHeight: '25px',
  width: '100%',
  gap: '3rem',
  flex: 3,

  h3: {
    fontSize: '$lg',
    fontWeight: 'normal',
  },

  a: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    color: '$gray200',
  },
});

export const LinkGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  svg: {
    height: '100%',
  },
});

export const UserContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  justifySelf: 'baseline',

  gap: '2rem',

  img: {
    borderRadius: '50%',
  },

  strong: {
    fontSize: '$lg',
  },
});
