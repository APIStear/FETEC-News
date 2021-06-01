import Header from './Header';
import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { useState } from "react";
import { getToken } from './TokenUtilities';
import PageFooter from './PageFooter'
import Theme from './Theme';
import EventView from './EventView';
import EventNew from './EventNew';
import AllEvents from './AllEvents';
import Admin from './Admin';
import Home from './Home';




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
          <Route path='/new-event' component={EventNew}/>
          <Route path='/events' component={AllEvents}/>
          <Route path='/admin' render={(props) =>(<Admin {... props} loginHandler={setLoggedIn} />)}/>
          <Route path='/*' component={Home} />
        </Switch>
      </Router>
<<<<<<< HEAD
      <Banner
        data={{ title: "Comité Electoral", paragraph: "Eventos Estudiantiles" }}
      />
      {/* <SpecialEvents data={dataSE} /> */}
      <Gallery/>
=======
>>>>>>> e2aec2db7d6c7ab9f14fce9d94ac2ef171318336
      <PageFooter />
    </Theme>
  );
}

export default App;
