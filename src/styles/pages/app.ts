import { ToastContainer } from "react-toastify";
import { styled } from "..";

export const AppContainer = styled("div", {
  display: "flex",
});

export const StyledToastContainer = styled(ToastContainer, {
  ".Toastify__toast": {
    whiteSpace: "pre-wrap",
  },

  ".Toastify__toast-body": {
    fontSize: "1.3rem",
  },

  ".Toastify__progress-bar-theme--light": {
    background: `linear-gradient(to left, $blue500, $gray400)`,
  },

  ".success.Toastify__toast-theme--light": {
    color: "$gray100",
    background: "$green300",
    "&:hover": {
      background: "green-500",
    },
  },

  ".error.Toastify__toast-theme--light": {
    color: "$gray100",
    background: "$red100",
    "&:hover": {
      background: "$red100",
    },
  },
});
