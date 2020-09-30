import { green, lightBlue } from "@material-ui/core/colors";

const { createMuiTheme } = require("@material-ui/core");

export const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
  },
});
