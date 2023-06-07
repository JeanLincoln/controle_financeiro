import { styled } from "..";

export const FiltersContainers = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  border: "1px solid $gray400",
  borderRadius: "10px",
  justifyContent: "flex-start",

  padding: "1rem",
  gap: "1rem",
});

export const ItemGroup = styled("div", {
  display: "flex",
  flexDirection: "column",

  label: {
    fontSize: "$md",
    margin: "0 0 .5rem .5rem",
  },

  input: {
    width: 250,
    padding: "1.34rem",
    border: "none",
    borderRadius: 8,
    fontSize: "$lg",
    color: "$gray100",

    backgroundColor: "$gray700",

    "&[type=date]": {
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

      "&::-webkit-datetime-edit": { paddingRight: "1rem" },
      "&::-webkit-datetime-edit-text": {
        color: "$gray100",
        padding: "0 .5rem",
      },
    },
  },

  select: {
    width: 250,
    padding: "1.34rem",
    border: "none",
    borderRadius: 8,
    fontSize: "$lg",
    color: "$gray100",

    backgroundColor: "$gray700",
  },
});
