import axios from "axios";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link, useHistory, useLocation } from "react-router-dom";
import EventList from "./EventList";
import { useState, useEffect } from "react";
import Searchbar from './Searchbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    marginTop: theme.spacing(1)
  },
  linkText: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3),
    //'font-weight': 'bold'
    // display: 'block'
  }
}))

const AdminDashboard = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events?sort=startDate`)
      .then(response => {
        setEvents(response.data.events);
      }).catch(error => {
        history.push('/', {error:"Hubo un error"});
        console.log(error);
      });
  }, [history, location]);

  const _search = value => {
    if(value !== '') {
      value = `?title=${value}`
    }
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events${value}&sort=startDate`)
      .then(response => {
        setEvents(response.data.events);
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Hubo un error");
        }  
      })
  }

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}
      />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3" >Dashboard de administrador</Typography>
        <Typography component="h2" variant="h4" classname={classes.subtitle}>Monitoreo de eventos pasados y proximos</Typography>
        <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.linkText}
            startIcon={<AddCircleIcon/>}
            to={{
              pathname: "/new-event",
              state: {from: location}
            }}
            component={Link}
        >
          
          Crear Evento
        </Button>
      </div>
      <Searchbar onChange={_search}/>
      <div className="EventsMain">
        <EventList events={events} toast={toast}/>
      </div>
    </Container>
  );
}

export default AdminDashboard;