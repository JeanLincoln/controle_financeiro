import { keyframes, styled } from "../..";

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

export const TransactionInfoGroupContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: "100%",
  gap: "1rem",
  padding: "2rem",
  borderRadius: 10,
  border: "1px solid $gray400",

  backgroundColor: "$gray700",

  ".noTransactions": {
    color: "$gray300",
  },

  h3: {
    fontSize: "$lg",
    color: "$gray300",
  },
});

export const TransactionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const TransactionContainer = styled("div", {
  borderRadius: 10,
  border: "1px solid $gray400",

  backgroundColor: "$gray700",

  ".noTransactions": {
    color: "$gray300",
  },

  button: {
    margin: "0 1rem",
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

  "@bp1": {
    display: "flex",
    flexWrap: "wrap-reverse",
    gap: 1,
    padding: "2rem",

    ".iconsDiv": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
  },

  "@bp4": {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "start",
    gap: 1,
    padding: "2rem",

    ".iconsDiv": {
      maxWidth: 100,
      display: "flex",
      justifyContent: "flex-start",
    },
  },
});

export const TransactionsInfosContainer = styled("div", {
  display: "flex",
  justifyContent: "start",
  flexWrap: "wrap",
  width: "100%",
  gap: 20,
  padding: "2rem",
  borderRadius: 10,
  border: "1px solid $gray400",

  backgroundColor: "$gray700",

  cursor: "pointer",

  "&:hover": {
    transition: "all ease .3s",
    backgroundColor: "$gray600",
    div: {
      border: "1px solid $gray700",
    },
  },

  h3: {
    fontSize: "$lg",
    color: "$gray300",
  },
});

export const TransactionInfoGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "space-around",
  flex: 1,
  border: "1px solid $gray500",
  borderRadius: 10,
  padding: "5px 10px",
  flexWrap: "wrap",

  "span, strong": {
    fontSize: "$lg",
    marginBottom: 5,
  },
});

export const TransactionType = styled("span", {
  borderRadius: "20px",
  padding: "5px",

  fontSize: "$md",

  variants: {
    transactionType: {
      income: {
        border: " 1px solid $green600",
        "&:not(:disabled):hover": {
          transition: "background-color 0.2s",
        },
        color: "$green500",
      },
      outcome: {
        border: " 1px solid $red100",
        "&:not(:disabled):hover": {
          transition: "background-color 0.2s",
        },
        color: "$red100",
      },
    },
  },
});

export const TransactionValue = styled("span", {
  variants: {
    transactionType: {
      income: {
        color: "$green500",
      },
      outcome: {
        color: "$red100",
      },
    },
  },
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
