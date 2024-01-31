const isEnv = (value: string): [boolean, string] => {
  return [
    value.startsWith("env(") && value.endsWith(")"),
    value.startsWith("env(") && value.endsWith(")")
      ? value.substring("env(".length, value.length - 1)
      : value,
  ];
};

export default isEnv;
