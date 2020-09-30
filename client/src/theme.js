import { lightBlue, pink } from "@material-ui/core/colors";

const { createMuiTheme } = require("@material-ui/core");

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#2dbe60" },
    secondary: lightBlue,
  },
});
