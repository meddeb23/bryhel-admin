import React, { Children, createContext, useState } from "react";

export const Store = createContext({ content: {}, setcontent: () => {} });

export default function ContextProvider({ children }) {
  const [content, setcontent] = useState();
  return (
    <Store.Provider value={{ content, setcontent }}>{children}</Store.Provider>
  );
}
