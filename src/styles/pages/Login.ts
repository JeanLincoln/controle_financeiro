import { styled } from "..";

export const AuthContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",

  height: "40rem",
  width: "50rem",
  margin: "10rem auto 0 auto",
  borderRadius: "8px",

  border: " 1px solid $gray400",
  backgroundColor: "$gray700",

  svg: {
    color: "$green500",
  },
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",

  h1: {
    fontSize: "1.7rem",
  },

  img: {
    height: "8rem",
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    width: "20rem",
    height: "5rem",
    gap: "2rem",
    borderRadius: "8px",
    border: "1px solid $gray300",
    transition: "all ease 0.3s",

    backgroundColor: "$gray500",
    color: "white",

    "&:hover": {
      backgroundColor: "$gray700",
    },

    img: {
      height: "2.5rem",
      width: "2.5rem",
    },
  },
});
