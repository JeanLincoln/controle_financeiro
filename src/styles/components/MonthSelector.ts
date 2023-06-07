import { styled } from "..";

export const MonthSelectorContainer = styled("div", {
  input: {
    border: "none",
    borderRadius: 8,
    color: "$gray100",

    backgroundColor: "$gray700",

    "&::-webkit-calendar-picker-indicator": {
      backgroundColor: "white",
      padding: "5px",
      cursor: "pointer",
      borderRadius: "10px",
    },
  },

  "@bp1": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    margin: "30px 0",
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$xl",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$2xl",
    },
  },

  "@bp2": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    margin: "30px 0",
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$xl",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$2xl",
    },
  },

  "@bp3": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: 30,
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$2xl",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$2xl",
    },
  },

  "@bp4": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: "2rem",
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$lg",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$xl",
    },
  },

  "@bp5": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: "2rem",
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$lg",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$xl",
    },
  },

  "@bp6": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: "2rem",
    gap: "1.5rem",

    input: {
      padding: "1rem",
      border: "none",
      borderRadius: 8,
      fontSize: "$lg",
      color: "$gray100",

      backgroundColor: "$gray700",

      "&::-webkit-calendar-picker-indicator": {
        backgroundColor: "white",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "10px",
      },
    },

    h2: {
      fontSize: "$xl",
    },
  },
});
