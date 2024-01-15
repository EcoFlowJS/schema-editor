import { CSSProperties } from "react";

interface style {
  ModePanel: CSSProperties;
  Modelable: CSSProperties;
  ModeIcon: CSSProperties;
}

const styles: style = {
  ModePanel: { padding: "0.5rem", borderWidth: "2px" },
  Modelable: { paddingRight: "0.2rem" },
  ModeIcon: { fontSize: "1.2rem", padding: "0" },
};

export default styles;
