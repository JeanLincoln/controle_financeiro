import { styled } from "..";
import * as Dialog from "@radix-ui/react-dialog";

export const TransactionInfoButton = styled("button", {
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  color: "$gray300",
  svg: {
    "&:hover": {
      color: "#00a7b3",
    },
  },
});

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100%",
  height: "100%",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
});
