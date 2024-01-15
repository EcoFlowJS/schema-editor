import React, { Children } from "react";

interface ArrayLoopProps {
  render: Function;
  of: Array<any>;
}

const ArrayLoop = ({ render, of }: ArrayLoopProps) =>
  Children.toArray(of.map((item, index) => render(item, index)));

export default ArrayLoop;
