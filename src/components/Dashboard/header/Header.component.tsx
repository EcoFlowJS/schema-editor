import { useAtom } from "jotai";
import { CiDark, CiLight } from "react-icons/ci";
import {
  Divider,
  FlexboxGrid,
  IconButton,
  Panel,
  Tooltip,
  Whisper,
} from "rsuite";
import themeMode from "../../../store/theme.mode";
import styles from "./style";
import initStatus, { isLoggedOut } from "../../../store/initStatusState.store";
import { IconWrapper } from "@eco-flow/components-lib";
import { LuLogOut } from "react-icons/lu";
import logoutHandler from "../../../helpers/logoutHaandler.helper";
import { MdSpaceDashboard } from "react-icons/md";

export default function DashboardHeader() {
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const [initStatusState] = useAtom(initStatus);
  const [_loggedOut, setLogOut] = useAtom(isLoggedOut);

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
              <Whisper
                placement="bottom"
                speaker={<Tooltip arrow={false}>Toggle Theme</Tooltip>}
              >
                <IconButton
                  appearance="link"
                  size="sm"
                  icon={darkMode ? <CiLight /> : <CiDark />}
                  onClick={toogleMode}
                  style={styles.ModeIcon}
                />
              </Whisper>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Divider vertical />
              <Whisper
                placement="bottom"
                speaker={<Tooltip arrow={false}>Main Dashboaard</Tooltip>}
              >
                <IconButton
                  appearance="link"
                  size="sm"
                  icon={<MdSpaceDashboard />}
                  style={styles.DasboardIcon}
                  as="a"
                  href={`${window.location.origin}/auth`}
                />
              </Whisper>
            </FlexboxGrid.Item>
            {initStatusState.isAuth ? (
              <FlexboxGrid.Item>
                <Divider vertical />
                <Whisper
                  placement="bottom"
                  speaker={<Tooltip arrow={false}>Sign out</Tooltip>}
                >
                  <IconButton
                    appearance="link"
                    title="logout"
                    icon={<IconWrapper icon={LuLogOut} />}
                    style={styles.LogoutIcon}
                    onClick={() => logoutHandler(setLogOut)}
                  />
                </Whisper>
              </FlexboxGrid.Item>
            ) : (
              <></>
            )}
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
