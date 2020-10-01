import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import TitleBox from "./titleBox";

const useStyles = makeStyles({
  notes: {
    color: "#878787",
    fontSize: " 21px",
  },
});

export default function TitleColumn({ allData, setSelected, deleteData }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.notes} m={3}>
        NOTES
      </Box>
      <Box flexGrow="1" component="div" className="titleColumn">
        {allData.map((data) => (
          <TitleBox
            key={data._id}
            data={data}
            setSelected={setSelected}
            deleteData={deleteData}
          />
        ))}
      </Box>
    </>
  );
}
