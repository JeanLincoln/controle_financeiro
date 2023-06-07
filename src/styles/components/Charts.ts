import { BarChart, PieChart } from "recharts";
import { styled } from "..";

export const ChartsContainer = styled("div", {
  display: "none",

  "@bp6": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "start",
    backgroundColor: "$gray400",
    boxShadow: "-5px 5px 5px #121214",
    borderRadius: 10,
    margin: "50px 50px 0 50px",
    marginBottom: "5rem",
  },
});

export const NoTransactionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  margin: "16rem 0",
  alignSelf: "center",

  ".noTransactions": {
    color: "$gray300",
  },

  h3: {
    fontSize: "$lg",
    color: "$gray300",
  },
});

export const ChartContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "5rem",

  ".recharts-wrapper": {
    width: "100%",
    height: "100%",
    padding: "3rem 0",
  },

  ".recharts-legend-wrapper": {
    position: "initial !important",
  },

  h1: {
    margin: "1rem 0",
  },

  h3: {
    letterSpacing: 2.5,
    fontSize: "$xl",
  },

  p: {
    fontSize: "$md",
    borderRadius: 10,
    backgroundColor: "$gray700",
    padding: "1rem",
  },

  ul: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "$md",
    backgroundColor: "$gray600",
    padding: "1rem !important",
    borderRadius: 10,
  },

  li: {
    margin: ".5rem",
  },
});

export const BarChartContainer = styled(BarChart, {
  height: "100% !important",
  // padding: "0!important",
  svg: {
    backgroundColor: "$gray500",
    border: "1px solid $gray300",
    borderRadius: 10,
    padding: "1rem",
    marginBottom: "2rem",
  },
});

export const PieChartContainer = styled(PieChart, {
  height: "100% !important",
  svg: {
    "&[cx]": {
      backgroundColor: "$gray500",
      border: "1px solid $gray300",
      borderRadius: 10,
      padding: "1rem",
      marginBottom: "2rem",
    },
  },
});
