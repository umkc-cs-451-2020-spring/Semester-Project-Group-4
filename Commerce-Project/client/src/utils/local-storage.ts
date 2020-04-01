import React from "react";
import store from "store";

export const useLocalStorageSetState = (initialValue: any, name: any) => {
  if (!name) {
    throw new Error("Name must be provided to persist to localStorage");
  }
  const actualInitialValue =
    store.get(name) !== undefined ? store.get(name) : initialValue;
  const [value, setValue] = React.useState(actualInitialValue);

  React.useEffect(
    () => {
      store.set(name, value);
    },
    [value, name]
  );
  return [value, setValue];
};