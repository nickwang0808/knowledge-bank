import React from "react";
import { Box, IconButton } from "@material-ui/core";
import TitleColumn from "./components/titles/titleColumn";
import Content from "./components/content/content";
import { Add } from "@material-ui/icons";

export default function App() {
  return (
    <>
      <Box display="flex" height="100vh">
        <Box
          bgcolor="#f8f8f8"
          height="100%"
          width="73px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton>
            <Add color="primary" />
          </IconButton>
        </Box>
        <Box bgcolor="white" width="350px">
          <TitleColumn />
        </Box>
        <Box bgcolor="white" height="100%" flexGrow="1">
          <Content />
        </Box>
      </Box>
    </>
  );
}
