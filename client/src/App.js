import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Box, IconButton } from "@material-ui/core";
import TitleColumn from "./components/titles/titleColumn";
import Content from "./components/content/content";
import NewContent from "./components/content/newContent";
import { Add } from "@material-ui/icons";
import Auth from "./components/auth/auth";
import { useQuery, gql, useMutation } from "@apollo/client";
import { getData, update, deleteNote, create } from "./gql";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // const checkAuth = async () => {
  //   const url = "http://localhost:4000/check-auth";
  //   const response = await fetch(url, {
  //     withCredentials: true,
  //     credentials: "include",
  //   }).then((res) => res.json());
  //   // why is this undefined
  //   console.log(response.isLoggedIn);

  //   if (response.isLoggedIn) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // return (
  //   <>
  //     <Router>
  //       <Switch>
  //         <Route exact path="/auth">
  //           {isLoggedIn ? <Redirect to="/" /> : <Auth checkAuth={checkAuth} />}
  //         </Route>
  //         <Route exact path="/">
  //           {!isLoggedIn ? <Redirect to="/auth" /> : <MainUI />}
  //         </Route>
  //       </Switch>
  //     </Router>
  //   </>
  // );
  return <MainUI />;
}

export function MainUI() {
  const [selected, setSelected] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  const { loading, error, data } = useQuery(getData);

  const [createData] = useMutation(create);

  const [updateData] = useMutation(update);

  const [deleteData] = useMutation(deleteNote);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;

  if (createNew) {
    return <NewContent createData={createData} setCreateNew={setCreateNew} />;
  }

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
            // createNew={createNew}
            // createDataToServer={createDataToServer}
          />
        </Box>
      </Box>
    </>
  );
}
