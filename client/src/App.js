import Header from './Header';
import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { useState } from "react";
import { getToken } from './TokenUtilities';
import PageFooter from './PageFooter'
import Theme from './Theme';
import EventView from './EventView';
import Admin from './Admin';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';


function App() {
  const [loggedIn, setLoggedIn] = useState(getToken());

  return (
    <Theme>
      <Router>
        <Header status={loggedIn} loginHandler={setLoggedIn}/>
        <Switch>
          <Route
            path='/login'
            render = {(props) => (<SignIn {... props}  loginHandler={setLoggedIn} />)}
          />
          <Route path='/event' component={EventView}/>
          <Route path='/admin' render={(props) =>(<Admin {... props} loginHandler={setLoggedIn} />)}/>
          <PrivateRoute path='/dashboard' component={Dashboard}/>
        </Switch>
        <PageFooter />
      </Router>
    </Theme>
  );
}

export default App;
