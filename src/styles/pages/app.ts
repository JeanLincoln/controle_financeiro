import { ToastContainer } from 'react-toastify'
import { styled } from '..'

export const AppContainer = styled('div', {
  display: 'flex',
})

export const AsideContainer = styled('div', {
  display: 'flex',
  position: 'fixed',
  flexDirection: 'column',
  alignItems: 'center',

  boxShadow: '5px 5px 5px #121214',

  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',

  backgroundColor: '$gray600',

  height: '100vh',
  padding: '3rem 2rem',
  gap: '8rem',
  width: '10rem',
  zIndex: 1,

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
})

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
})

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
})

export const LinkGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  svg: {
    height: '100%',
  },
})

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
})

export const StyledToastContainer = styled(ToastContainer, {
  '.Toastify__toast': {
    whiteSpace: 'pre-wrap',
  },

  '.Toastify__toast-body': {
    fontSize: '1.3rem',
  },

  '.Toastify__progress-bar-theme--light': {
    background: `linear-gradient(to left, $blue500, $gray400)`,
  },

  '.success.Toastify__toast-theme--light': {
    color: '$gray100',
    background: '$green300',
    '&:hover': {
      background: 'green-500',
    },
  },

  '.error.Toastify__toast-theme--light': {
    color: '$gray100',
    background: '$red100',
    '&:hover': {
      background: '$red100',
    },
  },
})
