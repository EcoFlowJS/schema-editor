export default (promise: Promise<any>) => {
  let status = "pending";
  let result: any = "";
  let suspense = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (res) => {
      status = "error";
      result = res;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw suspense;
      case "error":
        throw result;
      case "success":
        return result;
    }
  };
};
