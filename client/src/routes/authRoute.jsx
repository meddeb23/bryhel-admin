import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { userApi } from "../api";
import { UserContext } from "../components/UserContext";

export default function AuthRoute({ children, ...rest }) {
  const { isLoggedin, setUser, setIsLoggedin } = useContext(UserContext);
  const [search, setSearch] = useState(false);
  const location = useLocation();
  useEffect(() => {
    userApi
      .getUser()
      .then(({ data, status }) => {
        if (status === 200) {
          setUser(data.user);
          setIsLoggedin(true);
          setSearch(true);
        }
      })
      .catch((error) => {
        setSearch(true);
        console.log(error);
      });
  }, []);
  if (search) {
    return !isLoggedin ? (
      <Navigate to={{ pathname: "/login", state: { from: location } }} />
    ) : (
      children
    );
  } else return <></>;
}
