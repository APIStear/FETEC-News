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
import Banner from "./banner";
import Gallery from './gallery'
import SpecialEvents from "./specialEvents";




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
        </Switch>
      </Router>
      <Banner
        data={{ title: "Comité Electoral", paragraph: "Eventos Estudiantiles" }}
      />
      <SpecialEvents data={dataSE} />
      <Gallery/>
      <PageFooter />
    </Theme>
  );
}
var dataSE = [
  {
    icon: "fa fa-comments-o",
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
  },
  {
    icon: "fa fa-bullhorn",
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
  },
  {
    icon: "fa fa-group",
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
  },
  {
    icon: "fa fa-magic",
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
  },
];

export default App;
