import {
  Container,
  Content,
  FlexboxGrid,
  Footer,
  IconButton,
  Stack,
} from "rsuite";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGooglePlus,
  FaYoutube,
} from "react-icons/fa";

export default function DashboardFooter() {
  return (
    <Container
      style={{ height: "7rem", backgroundColor: "var(--rs-gray-900)" }}
    >
      <Content>
        <FlexboxGrid justify="center" align="middle" style={{ height: "100%" }}>
          <Stack spacing={10}>
            <IconButton
              icon={<FaFacebook />}
              color="cyan"
              appearance="primary"
              circle
            />
            <IconButton
              icon={<FaInstagram />}
              color="cyan"
              appearance="primary"
              circle
            />
            <IconButton
              icon={<FaTwitter />}
              color="cyan"
              appearance="primary"
              circle
            />
            <IconButton
              icon={<FaGooglePlus />}
              color="cyan"
              appearance="primary"
              circle
            />
            <IconButton
              icon={<FaYoutube />}
              color="cyan"
              appearance="primary"
              circle
            />
          </Stack>
        </FlexboxGrid>
      </Content>
      <Footer>
        <Container style={{ height: "2.5rem" }}>
          <FlexboxGrid
            justify="center"
            align="middle"
            style={{ height: "100%" }}
          >
            <span style={{ paddingRight: "0.3rem" }}>
              Copyright &copy; {new Date().getFullYear()};
            </span>
            <strong style={{ paddingRight: "0.3rem" }}>Designed by :</strong>{" "}
            Team Eco-Flow
          </FlexboxGrid>
        </Container>
      </Footer>
    </Container>
  );
}
