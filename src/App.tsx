import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/admin" component={AdminPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
