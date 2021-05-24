import * as React from "react"
import { AppBar, Button, Container, Toolbar, Hidden } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"
import SideDrawer from "./SideDrawer"
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { deleteToken, deleteUserId } from "./TokenUtilities";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
      color: `white`
  }
});


const Header = ({ status, loginHandler }) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  let navLinks = {};
  if(status) {
    navLinks = [
      { title: `Eventos`, path: `/events` },
      {title: 'Dashboard', path: '/dashboard'},
    ]
  } else {
    navLinks = [
      { title: `Eventos`, path: `/events` },
    ]
  }

  const _logout = _ => {
      deleteToken();
      deleteUserId();
      loginHandler(false);
      history.push("/");
  }

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Container className={classes.navbarDisplayFlex}>
          {/* Replace by CE Logo */}
          <Link to="/">
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" color="primary"/>
            </IconButton>
          </Link>
          <Hidden smDown>
            <List 
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
              <ListItem>
                {status? 
                  <Button 
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.linkText}
                      onClick={_logout}
                  >
                    Logout
                  </Button>
                :
                  <Button 
                      to={{
                        pathname: "/login",
                        state: { from: location }
                      }}
                      component={Link}
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.linkText}
                  >
                    Login
                  </Button>
                }
              </ListItem>
            </List>
          </Hidden>
          <Hidden mdUp>
            <SideDrawer navLinks={navLinks}/>
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
export default Header