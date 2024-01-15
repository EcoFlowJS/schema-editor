import React from "react";

import { RiAdminLine } from "react-icons/ri";
import { BsDatabaseFill } from "react-icons/bs";
import { TbBinaryTree2 } from "react-icons/tb";
import getConnections from "../../../../service/connections/getConnections.service";
import { Stack } from "rsuite";
import Button from "../button/Button";
import styles from "../style";

export default function DbSelector() {
  const getConnectionsList = getConnections();
  console.log(getConnectionsList);
  return (
    <Stack style={{ maxWidth: "85vw" }}>
      <Button
        appearance="primary"
        icon={<RiAdminLine />}
        labletext="Admin Panel"
        style={styles.IconButton}
        circle
      />
      <Button
        color="orange"
        appearance="primary"
        icon={<BsDatabaseFill />}
        labletext="Schema Panel"
        style={styles.IconButton}
        circle
      />
      <Button
        color="yellow"
        appearance="primary"
        icon={<TbBinaryTree2 />}
        style={{ ...styles.IconButton }}
        circle
        labletext="Flow Panel"
      />
    </Stack>
  );
}
