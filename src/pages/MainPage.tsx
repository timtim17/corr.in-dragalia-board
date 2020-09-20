import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CardList from '../components/CardList';
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserCard from '../components/user/Card';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4F8CF1'
    }
  }
});

function MainPage() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Corrin Conclave Dragalia
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <CardList component={UserCard} />
      </main>
    </ThemeProvider>
  );
}

export default MainPage;
