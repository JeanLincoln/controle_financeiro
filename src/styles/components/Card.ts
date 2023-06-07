import { styled } from "..";

export const Card = styled("div", {
  backgroundColor: "$gray400",
  boxShadow: "-5px 5px 5px #121214",

  span: {
    fontWeight: "bolder",
  },

  h2: {
    fontWeight: "bold",
  },

  "@bp1": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "space-between",

    width: "100%",
    minHeight: 100,
    padding: "2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$xl",
    },

    h2: {
      marginTop: 20,
      fontSize: "$2xl",
    },
  },

  "@bp2": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "space-between",

    width: "100%",
    minHeight: 100,
    padding: "2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$2xl",
    },

    h2: {
      marginTop: 20,
      fontSize: "$3xl",
    },
  },

  "@bp3": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "space-between",

    width: "100%",
    minHeight: 150,
    padding: "2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$xl",
    },

    h2: {
      marginTop: 20,
      fontSize: "$3xl",
    },
  },

  "@bp4": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "30rem",
    minHeight: "15rem",
    padding: "2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$md",
    },

    h2: {
      fontSize: "$2xl",
    },
  },

  "@bp5": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "27rem",
    minHeight: "15rem",
    padding: "2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$md",
    },

    h2: {
      fontSize: "$2xl",
    },
  },

  "@bp6": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "35rem",
    minHeight: "13rem",
    padding: "3.2rem",
    borderRadius: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: "1rem",
    },

    span: {
      fontSize: "$md",
    },

    h2: {
      fontSize: "$2xl",
    },
  },
});
