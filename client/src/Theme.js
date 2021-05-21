import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00B5E2',
    },
    secondary: {
      main: '#d0d0d0',
    },
  },
});

export default function Theme(props){
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}