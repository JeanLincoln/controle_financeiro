import { styled } from "..";

export const AsideContainer = styled("div", {
  boxShadow: "5px 5px 5px #121214",
  backgroundColor: "$gray600",
  zIndex: 1,
  transition: "all ease 0.2s",

  "@bp1": {
    display: "flex",
    position: "fixed",
    bottom: 0,
    alignItems: "center",

    height: 100,
    width: "100%",
    padding: "3rem 2rem",
    gap: 5,

    boxShadow: "0 -5px 5px #121214",

    "h3,h1,strong": {
      display: "none",
    },

    ul: {
      alignItems: "center",
    },
  },

  "@bp2": {
    display: "flex",
    position: "fixed",
    bottom: 0,
    alignItems: "center",

    height: 100,
    width: "100%",
    padding: "3rem 2rem",
    gap: 5,

    boxShadow: "0 -5px 5px #121214",

    "h3,h1,strong": {
      display: "none",
    },

    ul: {
      alignItems: "center",
    },
  },

  "@bp3": {
    display: "flex",
    position: "fixed",
    bottom: 0,
    alignItems: "center",

    height: 100,
    width: "100%",
    padding: "3rem 2rem",
    gap: "8rem",

    boxShadow: "0 -5px 5px #121214",

    "h3,h1,strong": {
      display: "none",
    },

    ul: {
      alignItems: "center",
    },
  },

  "@bp4": {
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    alignItems: "center",

    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",

    height: "100%",
    padding: "3rem 2rem",
    gap: "8rem",
    width: "10rem",

    "h3,h1,strong": {
      display: "none",
    },

    ul: {
      alignItems: "center",
    },

    "&:hover": {
      width: "29rem",
      padding: "3rem 5rem",

      "h1,strong": {
        display: "block",
      },

      h3: {
        display: "inline-block",
      },

      ul: {
        alignItems: "start",
      },
    },
  },
});

export const LogoContainer = styled("div", {
  svg: {
    color: "$green500",
  },

  a: {
    textDecoration: "none",
    color: "$gray200",
  },

  "@bp1": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",

    h1: {
      fontSize: "$2xl",
    },

    svg: {
      width: 25,
      height: 25,
    },
  },

  "@bp2": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",

    h1: {
      fontSize: "$2xl",
    },

    svg: {
      width: 25,
      height: 25,
    },
  },

  "@bp4": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",

    gap: "2rem",
    flex: 1,

    h1: {
      fontSize: "$2xl",
    },
  },
});

export const LinksContainer = styled("ul", {
  listStyle: "none",

  h3: {
    fontWeight: "normal",
  },

  a: {
    textDecoration: "none",
    color: "$gray200",
  },

  "@bp1": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    letterSpacing: "0.2rem",
    lineHeight: "25px",
    width: "100%",
    gap: 35,
    flex: 3,

    h3: {
      fontSize: "$lg",
      fontWeight: "normal",
    },

    a: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
  },

  "@bp2": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    letterSpacing: "0.2rem",
    lineHeight: "25px",
    width: "100%",
    gap: 35,
    flex: 3,

    h3: {
      fontSize: "$lg",
      fontWeight: "normal",
    },

    a: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
  },

  "@bp3": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    letterSpacing: "0.2rem",
    lineHeight: "25px",
    width: "100%",
    gap: 50,
    flex: 3,

    h3: {
      fontSize: "$lg",
      fontWeight: "normal",
    },

    a: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textDecoration: "none",
      color: "$gray200",
    },
  },

  "@bp4": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",

    letterSpacing: "0.2rem",
    lineHeight: "25px",
    width: "100%",
    gap: "3rem",
    flex: 3,

    h3: {
      fontSize: "$lg",
      fontWeight: "normal",
    },

    a: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textDecoration: "none",
      color: "$gray200",
    },
  },
});

export const LinkGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",

  svg: {
    height: "100%",
  },
});

export const UserContainer = styled("div", {
  img: {
    borderRadius: "50%",
  },

  button: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    svg: {
      color: "$gray300",
      transition: "all ease 0.3s",
    },

    "&:hover": {
      svg: {
        color: "$gray100",
      },
    },
  },

  "@bp1": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    justifySelf: "baseline",
    gap: 30,

    img: {
      height: 25,
      width: 25,
    },

    strong: {
      fontSize: "$lg",
    },
  },

  "@bp2": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    justifySelf: "baseline",
    gap: 30,

    img: {
      height: 25,
      width: 25,
    },

    strong: {
      fontSize: "$lg",
    },
  },

  "@bp3": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    justifySelf: "baseline",
    gap: 30,

    img: {
      height: 35,
      width: 35,
    },

    strong: {
      fontSize: "$lg",
    },
  },

  "@bp4": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    justifySelf: "baseline",
    gap: "2rem",

    strong: {
      fontSize: "$lg",
    },
  },
});
