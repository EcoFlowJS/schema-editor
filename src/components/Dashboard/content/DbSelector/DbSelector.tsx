import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { Stack } from "rsuite";
import Button from "../Button/Button";
import styles from "../style";
import DbButton from "../DbButton/DbButton";
import { useAtom } from "jotai";
import {
  createConnectionDrawerOpenClose,
  databaseGetConnectionList,
} from "../../../../store/Connections.store";
import getConnectionsService from "../../../../service/connections/getConnections.service";
import Loading from "../Loading/Loading";
import { userPermissions as permissionList } from "../../../../store/users.store";

export default function DbSelector() {
  //user Perissions
  const [userPermissions] = useAtom(permissionList);

  const [isLoading, setLoading] = useState(true);
  const [getConnectionsList, setGetConnectionsList] = useAtom(
    databaseGetConnectionList
  );
  const [_openNewConnectionDraawer, setOpenNewConnectionDrawer] = useAtom(
    createConnectionDrawerOpenClose
  );

  useEffect(() => {
    getConnectionsService().then((val) => {
      setLoading(false);
      setGetConnectionsList(val);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack
          spacing={15}
          style={{ maxWidth: "85vw" }}
          alignItems="flex-start"
        >
          {getConnectionsList.payload.map((item: any, index: any) => {
            return (
              <DbButton
                key={index}
                // onMouseUp={() => clearTimeout(timeout)}
                // onMouseDown={() => triggerEditConnections()}
                connectionID={item.connectionsName}
                iconName={item.driver}
                lable={item.connectionsName}
              />
            );
          })}

          {userPermissions.administrator ||
          userPermissions.createDBConnection ? (
            <Button
              appearance="default"
              icon={<TbPlus />}
              style={{ ...styles.IconButton }}
              circle
              labletext="New Connection"
              onClick={() => setOpenNewConnectionDrawer(true)}
            />
          ) : (
            <></>
          )}
        </Stack>
      )}
    </>
  );
}
