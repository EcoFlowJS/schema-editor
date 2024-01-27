const DB_DriverList = ["MongoDB", "MySQL", "PostgreSQL", "Sqlite"].map(
  (item) => ({
    label: item,
    value: item,
  })
);

export default DB_DriverList;
