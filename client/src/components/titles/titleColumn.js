import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import TitleBox from "./titleBox";

const useStyles = makeStyles({
  notes: {
    color: "#878787",
    fontSize: " 21px",
  },
});

export default function TitleColumn() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.notes} m={3}>
        NOTES
      </Box>
      <Box height="100%" component="div" className="titleColumn">
        <TitleBox />
        <TitleBox />
      </Box>
    </>
  );
}
