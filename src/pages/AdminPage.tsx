import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import NewCardForm from '../components/admin/NewCardForm';
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
    },
    secondary: {
      main: '#4F8CF1'
    }
  }
});

function AdminPage() {
  const firebaseAuth = firebase.auth();

  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [admins, setAdmins] = useState([] as string[]);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(setUser);
    firebase.database().ref('admins').on('value', snapshot => {
      setAdmins(snapshot.val());
    });
  }, []);
  if (user) {
    if (admins) {
      if (admins.includes(user.uid)) {
        return <PageInternals />;
      } else {
        return <NotAuthError />;
      }
    } else {
      return <p>Loading...</p>
    }
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
      </ThemeProvider>
    );
  }
}

function PageInternals() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CC Dragalia Admin
          </Typography>
          <Button color="inherit" onClick={signOut}>Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
        <NewCardForm />
      </main>
    </ThemeProvider>
  );
}

function NotAuthError() {
  return (
    <ThemeProvider theme={theme}>
      <p>
        Sorry, you need to be an admin to view this page. If you think you should be able to,
        contact austinj9#5465.
      </p>
      <Button variant="contained" color="primary" href="/">Go back</Button>
      <Button variant="contained" color="secondary" onClick={signOut}>Sign Out</Button>
    </ThemeProvider>
  );
}

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function signOut() {
  firebase.auth().signOut();
}

export default AdminPage;
