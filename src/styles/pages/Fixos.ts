import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",

  ".loader": {
    top: "0 !important",
    alignSelf: "center",
  },

  "@bp1": {
    marginTop: "3rem",
    gap: "3rem",
    padding: "10px 20px 0",
    marginBottom: 200,
    width: "100%",
  },

  "@bp2": {
    marginTop: "3rem",
    gap: "3rem",
    padding: "10px 20px 0",
    marginBottom: 200,
    width: "100%",
  },

  "@bp3": {
    marginTop: "3rem",
    gap: "3rem",
    padding: "10px 20px 0",
    marginBottom: 200,
    width: "100%",
  },

  "@bp4": {
    marginTop: "3rem",
    gap: "3rem",
    padding: "5rem 4rem 0",
    width: "100%",
    marginLeft: "10rem",
  },
});

export const ElementsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",

  "@bp1": {
    alignItems: "center",
    width: "100%",
    input: {
      '&[type="month"]': {
        alignSelf: "baseline",
      },
    },

    button: {
      marginTop: 20,
      justifySelf: "flex-start",
    },
  },

  "@bp2": {
    alignItems: "center",
    width: "100%",
    input: {
      '&[type="month"]': {
        alignSelf: "baseline",
      },
    },

    button: {
      marginTop: 20,
      justifySelf: "flex-start",
    },
  },

  "@bp3": {
    alignItems: "center",
    width: "100%",
    input: {
      '&[type="month"]': {
        alignSelf: "center",
      },
    },

    button: {
      marginTop: 20,
      justifySelf: "flex-start",
    },
  },

  "@bp4": {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",

    input: {
      '&[type="month"]': {
        alignSelf: "baseline",
      },
    },
  },
});

export const FiltersContainers = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

export const NoTransactionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",

  gap: 50,

  "@bp1": {
    fontSize: "$lg",
  },

  "@bp5": {
    fontSize: "$md",
  },
});

export const CardsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
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
