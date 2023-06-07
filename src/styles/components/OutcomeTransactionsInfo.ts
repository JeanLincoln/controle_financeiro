import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "..";
import { transform } from "typescript";

export const Content = styled(Dialog.Content, {
  borderRadius: 6,
  padding: "2.5rem 3rem",
  background: "$gray600",
  overflowY: "auto",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",

  "@bp1": {
    width: 310,
    height: 400,
  },

  "@bp4": {
    width: "auto",
    height: "auto",
  },
});

export const InfoGroupContainer = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  margin: 10,
  fontSize: "$lg",
});

export const InfoGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  textAlign: "start",
  gap: 10,

  margin: 10,
  padding: 15,
  borderRadius: 10,

  fontSize: "$lg",
  backgroundColor: "$gray700",
});

export const Title = styled(Dialog.Title, {
  textAlign: "center",
  fontSize: "$2xl",
});

export const CloseButton = styled(Dialog.Close, {
  position: "absolute",
  backougrnd: "transparent",
  border: 0,
  top: "2.25rem",
  right: "1.5rem",
  lineHeight: "0%",
  cursor: "pointer",
  color: "$gray300",
});
