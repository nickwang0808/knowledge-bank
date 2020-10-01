import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import TitleColumn from "./components/titles/titleColumn";
import Content from "./components/content/content";
import { Add } from "@material-ui/icons";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  async function getData() {
    const url = "http://localhost:4000/api/content";
    const response = await fetch(url).then((res) => res.json());
    response.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    setAllData(response);
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSelected(allData[0]);
  }, [allData]);

  async function updateData(data) {
    if (data._id) {
      const allDataCopy = allData.slice();
      const foundIndex = allDataCopy.findIndex((e) => e._id === data._id);
      allDataCopy[foundIndex] = {
        ...allDataCopy[foundIndex],
        title: data.title,
        body: data.body,
      };
      setAllData(allDataCopy);

      const url = `http://localhost:4000/api/content/${data._id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response.json());
    }
  }

  async function deleteData(id) {
    // update local
    const allDataCopy = allData.slice();
    const foundIndex = allDataCopy.findIndex((element) => element._id === id);
    allDataCopy.splice(foundIndex, 1);
    setAllData(allDataCopy);

    // update server/database
    const url = `http://localhost:4000/api/content/${id}`;
    await fetch(url, {
      method: "DELETE",
    });
  }

  function createDataLocal() {
    // console.log("create");
    setCreateNew(true);
    setSelected({
      title: "",
      body: "",
    });
  }

  async function createDataToServer(data) {
    console.log("data: ", data);
    const url = `http://localhost:4000/api/content/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setCreateNew(false);
    getData();
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
          <IconButton onClick={createDataLocal}>
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
            allData={allData}
            setSelected={setSelected}
            deleteData={deleteData}
          />
        </Box>
        <Box bgcolor="white" height="100%" flexGrow="1">
          <Content
            selected={selected}
            setSelected={setSelected}
            updateData={updateData}
            createNew={createNew}
            createDataToServer={createDataToServer}
          />
        </Box>
      </Box>
    </>
  );
}
