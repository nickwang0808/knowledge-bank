import { Box } from "@material-ui/core";
import React from "react";
import TitleBox from "./titleBox";

export default function TitleColumn() {
  return (
    <>
      <Box height="100%" component="div" overflow="auto">
        <TitleBox />
        <TitleBox />
        <TitleBox />
        <TitleBox />
        <TitleBox />
      </Box>
    </>
  );
}
