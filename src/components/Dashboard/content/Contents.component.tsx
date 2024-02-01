import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FlexboxGrid, Stack } from "rsuite";
import styles from "./style";
import DbSelector from "./DbSelector/DbSelector";

export default function DashboardContents() {
  return (
    <FlexboxGrid
      justify="center"
      align="middle"
      style={styles.FlexBoxDirection}
    >
      <FlexboxGrid.Item style={{ ...styles.Paddings, ...styles.LogoFontSize }}>
        <MdOutlineDashboardCustomize />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={styles.Paddings}>
        <h2>Database Dashboard</h2>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <div style={{ paddingTop: "4rem" }}>
          <DbSelector />
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
