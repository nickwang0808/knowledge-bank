import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, makeStyles } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import moment from "moment";

const useStyles = makeStyles({
  container: {
    padding: "16px 24px 0 24px",
    position: "relative",
    cursor: "pointer",
  },
  containerSelected: {
    border: "2px solid #e0e0e0",
    borderRadius: "3px",
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
    right: "4px",
    color: "inherit",
  },
  deleteButton: {
    fontSize: "20px",
    color: "white",
  },
});

export default function TitleBox({ data, setSelected, deleteData }) {
  const classes = useStyles();
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <>
      <Box
        className={`${classes.container} ${"hvr-fade"} `}
        display="flex"
        flexDirection="column"
        onClick={() => {
          setSelected(data);
        }}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {mouseEnter && (
          <Box className={classes.deleteButtonContainer} zIndex="9999">
            <IconButton
              className={classes.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                console.log("delete");
                deleteData(data._id);
              }}
            >
              <DeleteOutline className={classes.deleteButton} />
            </IconButton>
          </Box>
        )}
        <Box className={classes.title}>{data.title}</Box>
        <Box className={classes.date}>
          {moment(parseInt(data.date, 10)).startOf("hour").fromNow()}
        </Box>
        <Box className={classes.body}>
          {data.body.replace(/<\/?[^>]+(>|$)/g, " ")}
        </Box>

        <Divider style={{ marginTop: "14px" }} light />
      </Box>
    </>
  );
}
