import { styled } from "..";

export const Container = styled("div", {
  "@bp1": {
    display: "flex",
    flexDirection: "column",
    padding: "5rem 0 0",
    margin: "0 20px",
    gap: 30,
  },

  "@bp2": {
    display: "flex",
    flexDirection: "column",
    padding: "5rem 0 0",
    margin: "0 20px",
    gap: 30,
  },

  "@bp3": {
    display: "flex",
    flexDirection: "column",

    padding: "5rem 0 0",
    margin: "0 20px",
    gap: 30,
  },

  "@bp4": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    placeItems: "center",
    padding: "5rem 0rem 0",
    gap: "1rem",
  },

  "@bp5": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    placeItems: "center",
    padding: "5rem 0rem 0",
    gap: "3.5rem",
  },
});

export const TransactionsDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});
