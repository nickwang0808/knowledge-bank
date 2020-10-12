import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import google from "../img/google.png";
import bg from "../img/auth-bg.png";
import { Adb } from "@material-ui/icons";

const useStyles = makeStyles({
  signInBox: {
    height: "719px",
    maxHeight: "80%",
    width: "314px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "auto",
  },
  buttonText: {
    fontSize: "15px",
    textTransform: "capitalize",
  },
});

export default function Auth({ signUpAction, loginAction }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <LoginOrRegister
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      // perform login or signup mutation based on current ui
      action={showLogin ? loginAction : signUpAction}
    />
  );
}

export function LoginOrRegister({ showLogin, setShowLogin, action }) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Box
          py={2}
          bgcolor="white"
          maxWidth="100vw"
          width="532px"
          maxHeight="100vh"
          style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)" }}
        >
          <Box className={classes.signInBox}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              alignItems="center"
              mb={2}
            >
              <Adb style={{ fontSize: "70px" }} color="primary" />
              <Box fontSize="40px">Knowledge Bank</Box>
              <Box fontSize="16px">Remember everything important.</Box>
            </Box>
            <Button variant="outlined" fullWidth className={classes.buttonText}>
              <img
                src={google}
                style={{ marginRight: "8px" }}
                alt="google icon"
              />
              Continue with Google
            </Button>
            <Box textAlign="center" fontSize="12x" color="#a6a6a6">
              or
            </Box>

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.buttonText}
              onClick={(e) => {
                e.preventDefault();
                action({ variables: { username, password } });
              }}
            >
              {showLogin ? "Login" : "Register"}
            </Button>
            <Box textAlign="center" fontSize="12px" color="#a6a6a6;">
              {showLogin
                ? "By creating an account, you are agreeing to our Terms of Serviceand Privacy Policy."
                : "By Logging in you are agreeing to our Terms of Serviceand Privacy Policy."}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <Box textAlign="center" fontSize="14px" color="#737373">
                {showLogin
                  ? "Don't have an account yet?"
                  : "Already have an account?"}
              </Box>
              <Button
                style={{ textTransform: "capitalize" }}
                color="primary"
                onClick={() => setShowLogin((prev) => !prev)}
              >
                {showLogin ? "Create an Account" : "Go to Sign In"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
