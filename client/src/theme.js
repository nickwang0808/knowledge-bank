import { lightBlue } from "@material-ui/core/colors";

const { createMuiTheme } = require("@material-ui/core");

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#008f26" },
    secondary: lightBlue,
  },
});
