import React, { useEffect, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Box, InputBase, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "12px",
    marginBottom: "4px",
    width: "95%",
    color: theme.palette.primary.main,
    fontSize: "32px",
  },
}));

export default function Content({ selected, updateData }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    selected && setTitle(selected.title);
    selected && setBody(selected.body);
  }, [selected]);

  const pushUpdate = () => {
    updateData({ variables: { id: selected.id, title: title, body: body } });
  };

  return (
    <Box pl={2} pt={2}>
      {selected && (
        <>
          <InputBase
            className={classes.title}
            placeholder="New Document Tittle"
            // autoFocus={createNew ? true : false}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={pushUpdate}
          />
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
            onBlur={pushUpdate}
          />
        </>
      )}
    </Box>
  );
}
