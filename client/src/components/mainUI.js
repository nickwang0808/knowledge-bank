import React, { useEffect, useState } from "react";

import { Box, IconButton, makeStyles, Modal } from "@material-ui/core";
import TitleColumn from "./titles/titleColumn";
import Content from "./content/content";
import NewContent from "./content/newContent";
import { Add } from "@material-ui/icons";
import { useQuery, useMutation } from "@apollo/client";
import { getData, update, deleteNote, create } from "../gql";

const useStyles = makeStyles((theme) => ({
  position: {
    top: "0",
    right: "0",
    outline: "0",
  },
  paper: {
    backgroundColor: "white",
    position: "absolute",
    width: "70%",
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
}));

export default function MainUI() {
  const classes = useStyles();

  const [selected, setSelected] = useState(null);
  const [createNew, setCreateNew] = useState(false);
  const { loading, error, data, refetch } = useQuery(getData);
  const [updateData] = useMutation(update);
  const [createData, { loading: createLoading }] = useMutation(create);
  const [deleteData] = useMutation(deleteNote);

  useEffect(() => {
    if (data) {
      setSelected(data.allNotes[0]);
    }
  }, [data]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  return (
    <>
      <Modal open={createNew} onClose={() => setCreateNew(false)}>
        <Box className={`${classes.position} ${classes.paper}`}>
          <NewContent
            createData={createData}
            setCreateNew={setCreateNew}
            createLoading={createLoading}
            refetch={refetch}
          />
        </Box>
      </Modal>
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
          <IconButton onClick={() => setCreateNew(true)}>
            <Add color="primary" />
          </IconButton>
        </Box>
        <Box
          bgcolor="white"
          width="350px"
          display="flex"
          flexDirection="column"
        >
          <TitleColumn
            allData={data.allNotes}
            setSelected={setSelected}
            deleteData={deleteData}
          />
        </Box>
        <Box bgcolor="white" height="100%" flexGrow="1">
          <Content
            selected={selected}
            setSelected={setSelected}
            updateData={updateData}
          />
        </Box>
      </Box>
    </>
  );
}
