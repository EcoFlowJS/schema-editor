import { useAtom } from "jotai";
import { CiDark, CiLight } from "react-icons/ci";
import { FlexboxGrid, IconButton, Panel } from "rsuite";
import themeMode from "../../../store/theme.mode";
import styles from "./style";

export default function DashboardHeader() {
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const toogleMode = () => setDarkMode(!darkMode);
  return (
    <FlexboxGrid justify="end" align="middle">
      <FlexboxGrid.Item style={{ padding: "1rem" }}>
        <Panel bordered bodyFill style={styles.ModePanel}>
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item style={styles.Modelable}>
              <span>Mode :</span>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <IconButton
                appearance="link"
                size="sm"
                icon={darkMode ? <CiLight /> : <CiDark />}
                onClick={toogleMode}
                style={styles.ModeIcon}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
