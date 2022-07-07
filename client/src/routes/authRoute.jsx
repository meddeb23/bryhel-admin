import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { userApi } from "../api";
import { UserContext } from "../components/UserContext";

export default function AuthRoute({ children, ...rest }) {
  const { isLoggedin, setUser, setIsLoggedin } = useContext(UserContext);
  const [search, setSearch] = useState(false);

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
  return (
    search && (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    )
  );
}
