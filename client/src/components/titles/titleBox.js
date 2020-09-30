import React from "react";
import { Box, Divider, IconButton, makeStyles } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    padding: "16px 24px 0 24px",
    position: "relative",
  },
  title: {
    fontSize: "16px",
    color: "inherit",
    fontWeight: "400",
  },
  date: {
    fontSize: "11px",
    color: "inherit",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
  },
  body: {
    fontSize: "12px",
    color: "inherit",
    fontWeight: "400",
    lineHeight: "17px",
  },
  deleteButtonContainer: {
    display: "inline",
    position: "absolute",
    top: "4px",
    right: "16px",
    color: "inherit",
  },
  deleteButton: {
    fontSize: "20px",
    color: "inherit",
  },
});

export default function TitleBox() {
  const classes = useStyles();

  return (
    <>
      <Box
        className={`${classes.container} ${"hvr-fade"}`}
        display="flex"
        flexDirection="column"
        onClick={() => console.log("container")}
      >
        <Box className={classes.deleteButtonContainer} zIndex="9999">
          <IconButton
            className={classes.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              console.log("delete");
            }}
          >
            <DeleteOutline className={classes.deleteButton} />
          </IconButton>
        </Box>
        <Box className={classes.title}>Title</Box>
        <Box className={classes.date}>4 days ago</Box>
        <Box className={classes.body}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque dolorib
        </Box>

        <Divider style={{ marginTop: "14px" }} light />
      </Box>
    </>
  );
}
