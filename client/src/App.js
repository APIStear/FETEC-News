import Header from './Header';
import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { useState } from "react";
import { getToken } from './TokenUtilities';
import PageFooter from './PageFooter'
import Theme from './Theme';
import EventView from './EventView';
import EditEvent from './EditEvent';
import EventNew from './EventNew';
import AllEvents from './AllEvents';

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
          <Route path='/edit-event' component={EditEvent}/>
          <Route path='/new-event' component={EventNew}/>
          <Route path='/events' component={AllEvents}/>
          <Route path='/upcoming-events' component={AllEvents}/>
        </Switch>
        <PageFooter />
      </Router>
    </Theme>
  );
}

export default App;
