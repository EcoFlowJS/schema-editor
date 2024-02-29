import { Link } from "react-router-dom";
import {
  FlexboxGrid,
  IconButton,
  Navbar,
  Stack,
  Tooltip,
  Whisper,
} from "rsuite";
import { FaGithub } from "react-icons/fa";
import { MdLightMode, MdDarkMode, MdSpaceDashboard } from "react-icons/md";
import { useAtom } from "jotai";
import { isLoggedOut } from "../../store/initStatusState.store";
import themeMode from "../../store/theme.mode";
import logoutHandler from "../../helpers/logoutHaandler.helper";
import { LuLogOut } from "react-icons/lu";

export default function Header() {
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const toogleMode = () => setDarkMode(!darkMode);
  const [_loggedOut, setLogOut] = useAtom(isLoggedOut);

  return (
    <Navbar
      style={{ borderBottom: "1px solid var(--dashboard-navbar-border-color)" }}
    >
      <Link
        style={{ color: "var(--rs-navbar-default-text)" }}
        to="/editor/schema/database/"
      >
        <Navbar.Brand as="div" style={{ width: "260px" }}>
          ECO-FLOW:DATABASE
        </Navbar.Brand>
      </Link>
      <FlexboxGrid justify="end" align="middle" style={{ height: 56 }}>
        <FlexboxGrid.Item>
          <Stack spacing={10} style={{ paddingRight: 18 }}>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>GitHub Repo</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={<FaGithub />}
                href="https://github.com/RomelSikdar/eco-flow"
                target="_blank"
                as="a"
              />
            </Whisper>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>Toggle Light/Dark</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={darkMode ? <MdLightMode /> : <MdDarkMode />}
                onClick={toogleMode}
              />
            </Whisper>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>Main Dashboaard</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={<MdSpaceDashboard />}
                as="a"
                href={`${window.location.origin}/auth`}
              />
            </Whisper>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>Logout</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={<LuLogOut />}
                onClick={() => logoutHandler(setLogOut)}
              />
            </Whisper>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Navbar>
  );
}
