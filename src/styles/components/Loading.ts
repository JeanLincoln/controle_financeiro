import { keyframes, styled } from '..'

const coinFlip = keyframes({
  '0%, 100%': {
    animationTimingFunction: 'cubic-bezier(0.5, 0, 1, 0.5)',
  },
  '0%': {
    transform: 'rotateY(0deg)',
  },
  '50%': {
    transform: 'rotateY(1800deg)',
    animationTimingFunction: 'cubic-bezier(0, 0.5, 0.5, 1)',
  },
  '100%': {
    transform: 'rotateY(3600deg)',
  },
})

export const Loader = styled('span', {
  transform: 'translateZ(1px)',

  '&:after': {
    content: '$',
    display: 'inline-block',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '32px',
    fontWeight: 'bold',
    background: '#015F43',
    color: '#00b37e',
    border: '4px double ',
    boxSizing: 'border-box',
    boxShadow: ' 2px 2px 2px 1px rgba(0, 0, 0, .1)',
    animation: `${coinFlip} 4s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
  },
})
