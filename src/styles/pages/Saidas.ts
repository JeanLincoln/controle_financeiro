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

export const OutputValuesTable = styled("table", {
  textAlign: "center",

  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 0.5rem",
  marginTop: "1rem",

  fontSize: "$md",

  td: {
    padding: "1rem",
    backgroundColor: "$gray700",

    "&:first-child": {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    "&:last-child": {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      color: "$red100",
    },

    "button.delete": {
      backgroundColor: "transparent",
      border: "none",
      svg: {
        color: "$gray300",
        cursor: "pointer",
        "&:hover": {
          color: "$red100",
          animation: `${shakeBottom} 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
        },
      },
    },
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

export const SetIncomeTransactionButton = styled("button", {
  padding: "3rem",
  height: "1rem",
  borderRadius: 8,
  border: "none",
  backgroundColor: "$red200",
  color: "$white",
  fontWeight: "bold",
  fontSize: "$xl",
  cursor: "pointer",
  lineHeight: 0,
});
