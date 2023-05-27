import { styled } from "..";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  width: "35rem",
  minHeight: "13rem",
  padding: "3.2rem",
  borderRadius: 8,

  backgroundColor: "$gray400",
  boxShadow: "-5px 5px 5px #121214",

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: "1rem",
  },

  span: {
    fontSize: "$md",
    fontWeight: "bolder",
  },

  h2: {
    fontWeight: "bold",
    fontSize: "$2xl",
  },
});
