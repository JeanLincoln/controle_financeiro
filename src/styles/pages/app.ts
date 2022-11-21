import { styled } from '..';

export const Container = styled('div', {
  backgroundColor: '$gray700',
  padding: '0 16rem',
});

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

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
