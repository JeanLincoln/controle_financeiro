import { styled } from "..";

export const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  placeItems: "center",
  padding: "5rem 0rem 0",
  gap: "3.5rem",
});

export const TransactionsDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});
