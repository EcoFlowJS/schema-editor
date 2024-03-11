import { useParams } from "react-router-dom";
import { Button, ButtonProps, Divider, FlexboxGrid } from "rsuite";

interface DatabaseDataHeaderProps {
  insertButtonProps?: ButtonProps;
  refreshButtonProps?: ButtonProps;
}

export default function DatabaseDataHeader({
  insertButtonProps = {},
  refreshButtonProps = {},
}: DatabaseDataHeaderProps) {
  const { driver } = useParams();
  return (
    <FlexboxGrid
      justify="space-between"
      align="middle"
      style={{ paddingBottom: "1rem" }}
    >
      <FlexboxGrid.Item>
        <p
          style={{
            padding: "0 10px",
            fontSize: "large",
            color: "var(--text-info-color)",
          }}
        >
          All datas available in the{" "}
          {driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""}
        </p>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Button {...insertButtonProps}>Insert</Button>
        <Divider vertical />
        <Button {...refreshButtonProps}>Refresh</Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
