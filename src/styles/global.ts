import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  html: {
    fontSize: "62.5%",
    "@bp1": {
      fontSize: "40%",
    },
    "@bp5": {
      fontSize: "62.5%",
    },
  },

  body: {
    backgroundColor: "$gray600",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button, span": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  input: {
    "&:focus": {
      outline: 0,
      boxShadow: "0 0 0 2px #00875f",
    },
  },
});
