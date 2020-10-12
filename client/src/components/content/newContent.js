import React, { useEffect, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Box, Button, InputBase, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "12px",
    marginBottom: "4px",
    width: "95%",
    color: theme.palette.primary.main,
    fontSize: "32px",
  },
}));

export default function NewContent({ setCreateNew, createData }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const pushUpdate = () => {
    if (title !== "") {
      createData({ variables: { title: title, body: body } });
    }
    setCreateNew(false);
  };

  return (
    <Box pl={2} pt={2}>
      <>
        <InputBase
          className={classes.title}
          placeholder="New Document Tittle"
          // autoFocus={createNew ? true : false}
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={() => pushUpdate()}>Save</Button>
        <CKEditor
          editor={ClassicEditor}
          data={body || ""}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            // console.log("CKEditor onChange");
            setBody(editor.getData());
          }}
        />
      </>
    </Box>
  );
}
