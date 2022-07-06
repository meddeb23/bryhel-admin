import React, { Children, createContext, useState } from "react";

export const Store = createContext({
  content: {},
  setcontent: () => {},
  newImages: {},
  setnewImages: () => {},
});

export default function ContextProvider({ children }) {
  const [content, setcontent] = useState();
  const [newImages, setnewImages] = useState([]);
  return (
    <Store.Provider value={{ content, setcontent, newImages, setnewImages }}>
      {children}
    </Store.Provider>
  );
}
