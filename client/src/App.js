import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Auth from "./components/auth/auth";
import { useQuery, useMutation } from "@apollo/client";
import { login, signUp, checkAuth } from "./gql";
import MainUI from "./components/mainUI";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loginAction, { data: loginData }] = useMutation(login);
  const [signUpAction, { data: signUpData }] = useMutation(signUp);

  const { loading, error, data } = useQuery(checkAuth);
  const token = localStorage.getItem("token");

  // checkAuth
  useEffect(() => {
    if (!loading && !error) {
      setIsLoggedIn(data.checkAuth.isLoggedIn);
    }
  }, [data, error, loading]);

  // login
  useEffect(() => {
    if (loginData) {
      localStorage.setItem("token", loginData.login.token);
      setIsLoggedIn(loginData.login.isLoggedIn);
    }
  }, [loginData]);

  // signUp
  useEffect(() => {
    if (signUpData) {
      localStorage.setItem("token", signUpData.login.token);
      setIsLoggedIn(signUpData.login.isLoggedIn);
    }
  }, [signUpData]);

  if (token && loading) return <p>getting auth...</p>;
  if (token && error) return <p>err authing...</p>;

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/auth">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Auth loginAction={loginAction} signUpAction={signUpAction} />
            )}
          </Route>
          <Route exact path="/">
            {!isLoggedIn ? <Redirect to="/auth" /> : <MainUI />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}
