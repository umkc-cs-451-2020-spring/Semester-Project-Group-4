import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Pages/login/login';
import RegistrationForm from '../Pages/registration/RegistrationForm';
import DashBoard from '../Pages/dashboard/dashboard';

const App = () => {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/register" exact component={RegistrationForm} />
        <Route path="/dashboard" exact component={DashBoard} />
      </Switch>
    </Router>
  )
}

export default App;
