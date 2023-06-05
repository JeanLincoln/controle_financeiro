import { keyframes, styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",

  marginTop: "3rem",
  gap: "3rem",
  padding: "5rem 4rem 0",
  width: "100%",
  marginLeft: "10rem",
});

export const FiltersContainers = styled("div", {
  display: "flex",
  justifyContent: "space-around",
});

export const FilterItem = styled("button", {
  padding: "1.5rem",
  height: "1rem",
  borderRadius: 8,
  border: "none",
  backgroundColor: "$gray700",
  color: "$white",
  fontWeight: "bold",
  fontSize: "$md",
  cursor: "pointer",
  lineHeight: 0,

  "&:hover": {
    backgroundColor: "$gray400",
  },

  "&.activeFilter": {
    backgroundColor: "$gray400",
  },
});

export const ElementsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const SearchTransactionForm = styled("form", {
  display: "flex",
  width: "100%",
  gap: "1rem",

  input: {
    backgroundColor: "$gray700",
    border: "1px solid $gray400",
    padding: "1rem",
    borderRadius: "10px",
    color: "white",

    flex: 1,
  },
});
