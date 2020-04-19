import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Pages/login/LoginForm';
import RegistrationForm from '../Pages/registration/RegistrationForm';
import DashBoard from '../Pages/dashboard/dashboard';
import { ThemeProvider } from '@material-ui/core';
import { Theme } from '../components/Theme';
import SavingsDetail from '../Pages/accounts-detail/savings-detail.container';
import CheckingDetail from '../Pages/accounts-detail/checking-detail.container';
import MoneyMarketDetail from '../Pages/accounts-detail/money-market-detail.container';
import NotificationContainer from '../Pages/notifications/notifications-container';
import ProfileContainer from '../Pages/profile/profile.container';

const App = () => {

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" exact component={RegistrationForm} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/savings" exact component={SavingsDetail} />
          <Route path="/checking" exact component={CheckingDetail} />
          <Route path="/moneyMarket" exact component={MoneyMarketDetail} />
          <Route path="/notifications" exact component={NotificationContainer} />
          <Route path="/profile" exact component={ProfileContainer} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App;
