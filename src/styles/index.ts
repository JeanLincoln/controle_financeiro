import { createStitches } from '@stitches/react'

export const { config, styled, css, globalCss, keyframes, getCssText, theme, createTheme } =
  createStitches({
    theme: {
      colors: {
        white: `#fff`,

        blue500: '#4169E1',
        blue400: '#1E90FF',

        gray700: `#121214`,
        gray600: `#202024`,
        gray500: `#29292E`,
        gray400: `#323238`,
        gray300: `#7C7C8A`,
        gray200: `#c4c4cc`,
        gray100: `#e1e1e6`,

        green600: `#015F43`,
        green500: `#00875f`,
        green300: `#00b37e`,

        red200: `#aa2834`,
        red100: `#f75a68`,
      },

      fontSizes: {
        md: '1.3rem',
        lg: '1.6rem',
        xl: '2rem',
        '2xl': '2.4rem',
        '3xl': '3.2rem',
      },
    },
  })
