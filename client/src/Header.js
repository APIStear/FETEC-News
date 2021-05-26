import * as React from "react"
import { AppBar, Button, Container, Toolbar, Hidden } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import SideDrawer from "./SideDrawer"
import { Link, useLocation, useHistory } from 'react-router-dom'
import { deleteToken, deleteUserId } from "./TokenUtilities";

const useStyles = makeStyles(theme => ({
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
  },
  logo: {
    maxWidth: 100,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0)
  }
}));


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
      history.push("/", {success: "Se ha cerrado la sesión exitosamente."});
  }

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Container className={classes.navbarDisplayFlex}>
          {/* Replace by CE Logo */}
          <Link to="/">
            <img src='./ejecutivo azul-01.png' alt="Logo" className={classes.logo}/>
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
            <SideDrawer navLinks={navLinks} status={status} loginHandler={loginHandler}/>
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
export default Header