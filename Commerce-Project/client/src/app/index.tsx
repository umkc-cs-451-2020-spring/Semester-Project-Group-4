import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Pages/login/LoginForm';
import RegistrationForm from '../Pages/registration/RegistrationForm';
import DashBoard from '../Pages/dashboard/dashboard';
import { ThemeProvider } from '@material-ui/core';
import { Theme } from '../components/Theme';
import MoneyMarketDetail from '../Pages/accounts-detail/money-market-detail.container';

const App = () => {

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" exact component={RegistrationForm} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/moneyMarket" exact component={MoneyMarketDetail} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App;
