import React from "react";
import { SiMongodb } from "react-icons/si";
import { SiSqlite } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import styles from "../style";
import Button from "../Button/Button";
import { TypeAttributes } from "rsuite/esm/@types/common";
import { Link } from "react-router-dom";
import { IconButtonProps } from "rsuite";
import { editConnectionName } from "../../../../store/Connections.store";
import { useAtom } from "jotai";

interface DbButtonProps extends IconButtonProps {
  iconName?: string;
  lable?: string;
}

export default function DbButton({
  iconName = "",
  lable = "",
  ...props
}: DbButtonProps) {
  const [connectionName] = useAtom(editConnectionName);
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

  return (
    <>
      {lable !== connectionName ? (
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
    </>
  );
}
