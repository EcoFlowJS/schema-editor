import { CSSProperties } from "react";

interface style {
  ModePanel: CSSProperties;
  Modelable: CSSProperties;
  ModeIcon: CSSProperties;
  LogoutIcon: CSSProperties;
}

const styles: style = {
  ModePanel: { padding: "0.5rem", borderWidth: "2px" },
  Modelable: { paddingRight: "0.2rem" },
  ModeIcon: { fontSize: "1.2rem", padding: "0" },
  LogoutIcon: {
    fontSize: "1.2rem",
    padding: "0",
    color: "var(--rs-text-primary)",
  },
};

export default styles;
