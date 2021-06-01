import {useState, Fragment} from "react"
import { IconButton, Drawer, Button } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { Link, useHistory, useLocation } from 'react-router-dom';
import { deleteToken, deleteUserId } from "./TokenUtilities";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  drawerPrimary: {  
    background: theme.palette.secondary.main,
  }
}))

const SideDrawer = ({ navLinks, status, loginHandler }) => {
  const [state, setState] = useState({ right: false });
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ [anchor]: open })
  }
  
  const _logout = _ => {
    deleteToken();
    deleteUserId();
    loginHandler(false);
    history.push("/", {success: "Se ha cerrado la sesión exitosamente."});
  }

  const sideDrawerList = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path }) => (
          <Link to={path} key={title} className={classes.linkText}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
        <ListItem>
          {
            status?
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
    </div>
  );

  return (
    <Fragment>
      <IconButton 
          edge="start"
          aria-label="menu"
          onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>
      <Drawer 
          PaperProps={{className: classes.drawerPrimary}}
          anchor="right"
          open={state.right}
          onOpen={toggleDrawer("right", true)}
          onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>
    </Fragment>
  )
}
export default SideDrawer