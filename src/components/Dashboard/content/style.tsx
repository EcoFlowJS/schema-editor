import { CSSProperties } from "react";

interface Style {
  Paddings: CSSProperties;
  LogoFontSize: CSSProperties;
  FlexBoxDirection: CSSProperties;
  IconButton: CSSProperties;
}

const styles: Style = {
  Paddings: { paddingTop: "1.8rem" },
  LogoFontSize: { fontSize: "3rem" },
  FlexBoxDirection: {
    flexDirection: "column",
  },
  IconButton: {
    width: "4rem",
    height: "4rem",
    fontSize: "1.8rem",
  },
};

export default styles;
