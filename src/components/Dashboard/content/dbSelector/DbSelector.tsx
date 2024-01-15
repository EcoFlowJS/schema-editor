import React, { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import getConnections from "../../../../service/connections/getConnections.service";
import { Stack } from "rsuite";
import Button from "../Button/Button";
import styles from "../style";
import ArrayLoop from "../../../../utils/ArrayLoop/ArrayLoop";
import DbButton from "../DbButton/DbButton";
import { useAtom } from "jotai";
import { createConnectionDrawerOpenClose } from "../../../../store/satabaseConnections.store";

export default function DbSelector() {
  const [getConnectionsList, setgetConnectionsList] = useState(
    getConnections()
  );

  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);

  return (
    <Stack spacing={15} style={{ maxWidth: "85vw" }} alignItems="flex-start">
      <ArrayLoop
        of={getConnectionsList.payload}
        render={(item: any, index: any) => (
          <DbButton iconName={item.driver} lable={item.connectionsName} />
        )}
      />
      <Button
        appearance="default"
        icon={<TbPlus />}
        style={{ ...styles.IconButton }}
        circle
        labletext="New Connection"
        onClick={() => setOpen(true)}
      />
    </Stack>
  );
}
