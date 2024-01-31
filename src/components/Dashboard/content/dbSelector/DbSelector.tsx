import React, { useEffect } from "react";
import { TbPlus } from "react-icons/tb";
import getConnectionsPromise from "../../../../service/connections/getConnectionsPromise.service";
import { Stack } from "rsuite";
import Button from "../Button/Button";
import styles from "../style";
import DbButton from "../DbButton/DbButton";
import { useAtom } from "jotai";
import {
  createConnectionDrawerOpenClose,
  databaseGetConnectionList,
  editConnectionDrawerOpenClose,
  editConnectionName,
} from "../../../../store/Connections.store";

export default function DbSelector() {
  const list = getConnectionsPromise();
  const [getConnectionsList, setGetConnectionsList] = useAtom(
    databaseGetConnectionList
  );
  const [_openNewConnectionDraawer, setOpenNewConnectionDrawer] = useAtom(
    createConnectionDrawerOpenClose
  );
  const [_editNewConnectionDraawer, setEditNewConnectionDrawer] = useAtom(
    editConnectionDrawerOpenClose
  );
  const [connectionName, setConnectionName] = useAtom(editConnectionName);

  useEffect(() => setGetConnectionsList(list), []);

  let timeout: NodeJS.Timeout = setTimeout(() => {});

  const triggerEditConnections = (connectionName: string) => {
    timeout = setTimeout(() => {
      setEditNewConnectionDrawer(true);
      setConnectionName(connectionName);
    }, 3000);
  };
  return (
    <Stack spacing={15} style={{ maxWidth: "85vw" }} alignItems="flex-start">
      {getConnectionsList.payload.map((item: any, index: any) => {
        return (
          <DbButton
            key={index}
            onMouseUp={() => clearTimeout(timeout)}
            onMouseDown={() => triggerEditConnections(item.connectionsName)}
            iconName={item.driver}
            lable={item.connectionsName}
          />
        );
      })}
      <Button
        appearance="default"
        icon={<TbPlus />}
        style={{ ...styles.IconButton }}
        circle
        labletext="New Connection"
        onClick={() => setOpenNewConnectionDrawer(true)}
      />
    </Stack>
  );
}
