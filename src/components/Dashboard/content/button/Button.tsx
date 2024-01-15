import { FlexboxGrid, IconButton, IconButtonProps } from "rsuite";
import styles from "../style";

interface DashboardButtonProps extends IconButtonProps {
  labletext?: string;
}

export default function Button(contents: DashboardButtonProps) {
  const { labletext } = contents;
  return (
    <FlexboxGrid
      justify="center"
      align="middle"
      style={styles.FlexBoxDirection}
    >
      <FlexboxGrid.Item>
        <IconButton {...contents} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={{ padding: "1rem" }}>
        <strong>
          <span>{labletext}</span>
        </strong>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
