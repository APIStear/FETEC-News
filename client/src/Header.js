import * as React from "react"
import { AppBar, Button, Container, Toolbar, Hidden } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"
import SideDrawer from "./SideDrawer"
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import { useHistory } from "react-router-dom";
import { deleteToken, deleteUserId } from "./TokenUtilities";

=======
>>>>>>> 92acc4bf2bc89ebff0dd984977037395d35933df
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

<<<<<<< HEAD

const Header = ({ status, loginHandler }) => {
  const classes = useStyles();
  let history = useHistory();
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

=======
const navLinks = [
  { title: `Eventos`, path: `/events` },
  { title: `Dashboard`, path: `/dashboard` },
]

const Header = () => {
  const classes = useStyles();
>>>>>>> 92acc4bf2bc89ebff0dd984977037395d35933df
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
<<<<<<< HEAD
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
                      to="/login"
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
=======
            <ListItem>
              <Button 
                  to="/login"
                  component={Link}
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.linkText}
              >
                Login
              </Button>
            </ListItem>
>>>>>>> 92acc4bf2bc89ebff0dd984977037395d35933df
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