import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006747',
    },
    secondary: {
      main: '#fff'
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f"
    }
  }
});
