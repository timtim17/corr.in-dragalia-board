import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import red from '@material-ui/core/colors/red';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500]
    }
  }
});

function AdminPage() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CC Dragalia Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <h1>beep boop admin time.</h1>
      </main>
    </ThemeProvider>
  );
}

export default AdminPage;
