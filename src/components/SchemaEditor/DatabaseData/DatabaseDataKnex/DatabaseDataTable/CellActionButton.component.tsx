import { Table, Divider, IconButton } from "rsuite";
import { GrEdit, GrTrash } from "react-icons/gr";
import { IconWrapper } from "@ecoflow/components-lib";

interface CellActionButtonProps {
  dataKey?: string;
  onClickEdit?: (rowID: string) => void;
  onClickDelete?: (rowID: string) => void;
  dropDisabled?: boolean;
  editDisabled?: boolean;
  [key: string]: any;
}

export default function CellActionButton({
  rowData,
  dataKey,
  onClickEdit = () => {},
  onClickDelete = () => {},
  dropDisabled = false,
  editDisabled = false,
  ...props
}: CellActionButtonProps) {
  return (
    <Table.Cell
      {...props}
      style={{
        padding: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        title="Edit Row"
        disabled={editDisabled}
        appearance="subtle"
        onClick={() => {
          onClickEdit(rowData.id);
        }}
        icon={<IconWrapper icon={GrEdit} />}
      />
      <Divider
        vertical
        style={{ margin: "0 5px", backgroundColor: "var(--rs-text-primary)" }}
      />
      <IconButton
        title="Remove Row"
        disabled={dropDisabled}
        appearance="subtle"
        color="red"
        onClick={() => {
          onClickDelete(rowData.id);
        }}
        icon={<IconWrapper icon={GrTrash} />}
      />
    </Table.Cell>
  );
}
