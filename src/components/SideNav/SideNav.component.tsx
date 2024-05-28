import { IconWrapper } from "@ecoflow/components-lib";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { CiViewTable, CiSquarePlus } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Nav, Navbar, Placeholder, Sidebar, Sidenav } from "rsuite";
import "./style.less";
import getCollectionOrTable from "../../service/database/getCollectionOrTable.service";
import { ApiResponse } from "@ecoflow/types";
import { FaTableList } from "react-icons/fa6";
import { useAtom } from "jotai";
import { tableList } from "../../store/schemaEditor.store";
import { userPermissions as userPermissionsList } from "../../store/users.store";

export default function SideNav() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [expand, setExpand] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [collectionORtable, setCollectionORTable] = useAtom(tableList);
  const [DB_Type, setDB_Type] = useState("");

  //User permission states
  const [userPermissions] = useAtom(userPermissionsList);

  useEffect(() => {
    (async () => {
      try {
        const collectionORtableResponse = (await getCollectionOrTable(
          id!
        )) as ApiResponse;
        if (collectionORtableResponse.success) {
          setDB_Type(collectionORtableResponse.payload.type);
          setCollectionORTable(
            collectionORtableResponse.payload.collectionsORtables
          );
        }
        setLoading(false);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  const navigationHandler = (eventKey: string) => {
    if (eventKey && eventKey.startsWith("Table-")) {
      const index = Number(eventKey.substring("Table-".length));
      navigate(`${DB_Type.toLowerCase()}/${collectionORtable[index]}`);
    }
    if (eventKey && eventKey === "addNewTable")
      navigate(`create/${DB_Type.toLowerCase()}`);
  };

  return (
    <Sidebar
      style={{ display: "flex", flexDirection: "column" }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav
        expanded={expand}
        style={{ height: "100%" }}
        defaultOpenKeys={["1"]}
      >
        <Sidenav.Body>
          {isLoading ? (
            <Placeholder active style={{ padding: "1rem" }} rows={4} />
          ) : (
            <Nav onSelect={navigationHandler}>
              <Nav.Menu
                defaultChecked
                eventKey="1"
                trigger="hover"
                title={
                  DB_Type === "KNEX"
                    ? "Tables"
                    : DB_Type === "MONGO"
                    ? "Collections"
                    : DB_Type
                }
                icon={<IconWrapper className="icon-color" icon={CiViewTable} />}
                placement="rightStart"
              >
                {collectionORtable.map((collectionORtable, index) => {
                  return (
                    <Nav.Item
                      key={index}
                      eventKey={`Table-${index}`}
                      active={loc.pathname.endsWith(`/${collectionORtable}`)}
                      icon={<IconWrapper icon={FaTableList} />}
                    >
                      {collectionORtable}
                    </Nav.Item>
                  );
                })}
                {userPermissions.administrator ||
                userPermissions.createCollectionTable ? (
                  <Nav.Item
                    eventKey="addNewTable"
                    icon={<IconWrapper icon={CiSquarePlus} />}
                    active={false}
                  >
                    Add{" "}
                    {DB_Type === "KNEX"
                      ? "Tables"
                      : DB_Type === "MONGO"
                      ? "Collections"
                      : DB_Type}
                  </Nav.Item>
                ) : (
                  <></>
                )}
              </Nav.Menu>
            </Nav>
          )}
        </Sidenav.Body>
      </Sidenav>
      <Navbar
        className="nav-toggle"
        style={{ borderTop: "1px solid var(--dashboard-navbar-border-color)" }}
      >
        <Nav pullRight>
          <Nav.Item
            onClick={() => setExpand(!expand)}
            style={{ width: 56, textAlign: "center", fontSize: "2rem" }}
          >
            {expand ? <FaCaretLeft /> : <FaCaretRight />}
          </Nav.Item>
        </Nav>
      </Navbar>
    </Sidebar>
  );
}
