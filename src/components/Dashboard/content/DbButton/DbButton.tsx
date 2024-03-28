import React, { useState } from "react";
import { SiMongodb } from "react-icons/si";
import { SiSqlite } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import styles from "../style";
import Button from "../Button/Button";
import { TypeAttributes } from "rsuite/esm/@types/common";
import { Link } from "react-router-dom";
import {
  Divider,
  IconButton,
  IconButtonProps,
  Stack,
  Tooltip,
  Whisper,
} from "rsuite";
import {
  databaseGetConnectionList,
  editConnectionDrawerOpenClose,
  editConnectionName,
} from "../../../../store/Connections.store";
import { useAtom } from "jotai";
import { userPermissions as permissionList } from "../../../../store/users.store";
import { AlertModal, IconWrapper } from "@eco-flow/components-lib";
import { TbDatabaseEdit, TbDatabaseX } from "react-icons/tb";
import "./style.less";
import deleteConnectionService from "../../../../service/connections/deleteConnection.service";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";

interface DbButtonProps extends IconButtonProps {
  connectionID: string;
  iconName?: string;
  lable?: string;
}

export default function DbButton({
  connectionID,
  iconName = "",
  lable = "",
  onMouseDown = () => {},
  onMouseUp = () => {},
  ...props
}: DbButtonProps) {
  //user Perissions
  const [userPermissions] = useAtom(permissionList);

  const [connectionName, setConnectionName] = useAtom(editConnectionName);
  const setEditNewConnectionDrawer = useAtom(editConnectionDrawerOpenClose)[1];

  //Notifications
  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];

  //remove connection state
  const setDatabaseConnectionList = useAtom(databaseGetConnectionList)[1];
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const connectionDeleteHandler = () => {
    setDeleteLoading(true);
    deleteConnectionService(connectionID).then((response) => {
      setDeleteLoading(false);
      if (response.success) {
        setOpenDeleteConfirmModal(false);
        setEditNewConnectionDrawer(false);
        setDatabaseConnectionList(response.payload.connectionList);
        successNoti({
          show: true,
          message: response.payload.message,
          header: "Connection Removal Success",
        });
      }

      if (response.error) {
        setOpenDeleteConfirmModal(false);
        errorNoti({
          show: true,
          message: response.payload.message,
          header: "Connection Removal Error",
        });
      }
    });
  };

  const icon =
    iconName === "MYSQL" ? (
      <SiMysql />
    ) : iconName === "PGSQL" ? (
      <BiLogoPostgresql />
    ) : iconName === "SQLite" ? (
      <SiSqlite />
    ) : iconName === "MONGO" ? (
      <SiMongodb />
    ) : (
      <></>
    );

  const colorList: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "violet",
  ];
  const color: TypeAttributes.Color = colorList[
    Math.floor(Math.random() * colorList.length)
  ] as TypeAttributes.Color;

  const openEditConnections = () => {
    setEditNewConnectionDrawer(true);
    setConnectionName(connectionID);
  };

  return (
    <>
      {lable !== connectionName ? (
        <Whisper
          placement="top"
          enterable
          speaker={
            <Tooltip style={{ padding: 0 }}>
              <Stack
                spacing={5}
                divider={<Divider vertical style={{ margin: 0 }} />}
              >
                <IconButton
                  className="EditConnections"
                  appearance="link"
                  icon={<IconWrapper icon={TbDatabaseEdit} />}
                  onClick={openEditConnections}
                  disabled={
                    !userPermissions.administrator &&
                    !userPermissions.modifyDBConnection
                  }
                />
                <IconButton
                  className="DeleteConnections"
                  appearance="link"
                  icon={<IconWrapper icon={TbDatabaseX} />}
                  color="red"
                  onClick={() => setOpenDeleteConfirmModal(true)}
                  disabled={
                    !userPermissions.administrator &&
                    !userPermissions.removeDBConnection
                  }
                />
              </Stack>
            </Tooltip>
          }
        >
          <span>
            <Link to={`/editor/schema/database/${lable}`}>
              <Button
                color={color}
                appearance="primary"
                icon={icon}
                style={{ ...styles.IconButton }}
                circle
                labletext={lable}
                {...props}
              />
            </Link>
          </span>
        </Whisper>
      ) : (
        <Button
          color={color}
          appearance="primary"
          icon={icon}
          style={{ ...styles.IconButton }}
          circle
          labletext={lable}
          {...props}
        />
      )}

      <AlertModal
        open={openDeleteConfirmModal}
        confirmButtonText="Comfirm"
        CancelButtonText="Cancel"
        confirmButtonProps={{
          color: "red",
          onClick: connectionDeleteHandler,
          disabled: deleteLoading,
        }}
        CancelButtonProps={{ onClick: () => setOpenDeleteConfirmModal(false) }}
        size="sm"
      >
        <AlertModal.Body>
          <h6>Do you Want Remove Database Connections?</h6>
          <Divider />
          <p>
            Removing Database connection{" "}
            <u>
              <strong>{connectionName}</strong>
            </u>{" "}
            will also stop function of nodes connected with this connection.
          </p>
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
