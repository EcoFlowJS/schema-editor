import { useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Container, Content } from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav.component";

export default function DatabaseLayout() {
  const { id } = useParams();

  useLayoutEffect(() => {
    document.title = `Schema ${id}`;
    window.history.replaceState(null, document.title, window.location.href);
  }, []);

  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <Header />
        <Container>
          <SideNav />
          <Content style={{ position: "relative" }}>
            <Container
              style={{
                padding: "2rem",
                backgroundColor: "var(--dashboard-content-background-color)",
                overflowY: "auto",
                position: "absolute",
                top: "0",
                bottom: "0",
                right: "0",
                left: "0",
              }}
            >
              <Outlet />
            </Container>
          </Content>
        </Container>
      </Container>
    </>
  );
}
