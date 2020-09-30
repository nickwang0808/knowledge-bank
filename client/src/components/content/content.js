import React, { useState } from "react";
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

export default function Content() {
  const classes = useStyles();

  const [value, setValue] = useState("<p>Hello from CKEditor 5!</p>");

  return (
    <Box pl={2} pt={2}>
      <InputBase className={classes.title} placeholder="title" />
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          setValue(editor.getData());
        }}
      />
    </Box>
  );
}
