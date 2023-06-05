import { keyframes, styled } from "..";

const shakeBottom = keyframes({
  "0%, 100%": {
    transform: "rotate(0deg)",
    transformOrigin: " 50% 100%",
    animationTimingFunction: "cubic-bezier(0.5, 0, 1, 0.5)",
  },
  "10%": { transform: "rotate(2deg)" },
  "20%,  40%,  60%": { transform: "rotate(-4deg)" },
  "30%,  50%,  70%": { transform: "rotate(4deg);" },
  "80%": { transform: "rotate(-2deg)" },
  "90%": { transform: "rotate(2deg)" },
});

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",

  marginTop: "3rem",
  gap: "3rem",
  padding: "5rem 4rem 0",
  width: "100%",
  marginLeft: "10rem",

  ".loader": {
    top: "0 !important",
    alignSelf: "center",
  },
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
  width: "100%",
  justifyContent: "space-between",
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

export const CardsContainer = styled("div", {
  display: "flex",
  gap: "2rem",
});

export const VariantSubTotal = styled("h2", {
  variants: {
    subTotalType: {
      positive: {
        color: "$green500",
      },
      negative: {
        color: "$red100",
      },
    },
  },
});
