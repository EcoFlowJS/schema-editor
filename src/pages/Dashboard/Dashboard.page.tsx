import { Container, Content, Footer, Header } from "rsuite";
import DashboardHeader from "../../components/Dashboard/header/Header.component";
import DashboardContents from "../../components/Dashboard/content/Contents.component";
import DashboardFooter from "../../components/Dashboard/footer/Footer.component";
import AddConnectionDrawer from "../../components/Dashboard/Drawer/AddConnectionDrawer/AddConnectionDrawer.component";
import EditConnectionDrawer from "../../components/Dashboard/Drawer/EditConnectionDrawer/EditConnectionDrawer.component";

export default function Dashboard() {
  return (
    <>
      <Container style={{ height: "100vh" }}>
        <Header>
          <DashboardHeader />
        </Header>
        <Content>
          <DashboardContents />
        </Content>
        <Footer>
          <DashboardFooter />
        </Footer>
      </Container>
      <AddConnectionDrawer />
      <EditConnectionDrawer />
    </>
  );
}
