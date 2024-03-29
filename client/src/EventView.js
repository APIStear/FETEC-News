import axios from 'axios';
import { useEffect, useState } from 'react';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image'
import { getUserId, getToken, deleteUserId, deleteToken, isAdminUser } from './TokenUtilities';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  title: "",
  description: "",
  startDate: new Date(),
  imgKeys: [],
  endDate: new Date(),
  location: "",
  isRSVP: false,
  RSVPlist: [],
  studentGroup: "",
  canceled: false
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    padding: [[theme.spacing(3), theme.spacing(6), theme.spacing(6)]],
    "& h2": {
      marginTop: theme.spacing(2)
    }
  },
  centerText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    marginTop: theme.spacing(4),
    padding: [[theme.spacing(1), theme.spacing(3)]],
    //'font-weight': 'bold'
    display: 'block',
    width: '40%'
  },
  warningButton: {
    backgroundColor: "#FF0000",
    marginTop: theme.spacing(4),
    padding: [[theme.spacing(1), theme.spacing(3)]],
    display: 'block',
    width: '40%'
  },

  coolButton: {
    backgroundColor: "#00FF00",
    marginTop: theme.spacing(4),
    padding: [[theme.spacing(1), theme.spacing(3)]],
    display: 'block',
    width: '40%'
  },

  canceled: {
    color: "#FF0000"
  }
}));
const EventView = ({ history, location }) => {
  const [event, setEvent] = useState(initialState);
  const [RSVPed, setRSVPed] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const classes = useStyles();

  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { eventId } = parsed;

  useEffect(() => {
    if(location && location.state && location.state.error !== "") {
      if(location.state.error !== "") {
        toast.error(location.state.error)
      }
      if(location.state.success !== "") {
        toast.success(location.state.success)
      }
    }
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}`)
      .then(response => {

        response.data.event.startDate = new Date(response.data.event.startDate)
        response.data.event.endDate = new Date(response.data.event.endDate)

        setEvent(response.data.event)
        setCanceled(response.data.event.canceled);
        document.title = `${response.data.event.title} | Comité Ejecutivo`
        const userId = getUserId()
        if(userId && !isAdminUser()) {
          return axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${getToken()}` }
            })
        } else return {data: {RSVPed: false}}
      })
      .then(response => {
        setRSVPed(response.data.RSVPed)

      })
      .catch(error => {
        if (error.response) {
          history.push("/", {error: error.response.data.message})
        } else {
          history.push('/', {error:"Hubo un error"});
        }
      })

  }, [eventId, history, location])

  const _RSVP = _ => {
    if(!getUserId()) {
      return history.push("/login", {from: location, error: 'Debes iniciar sesión para hacer eso.'});
    }
    return axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}/users/${getUserId()}`, {},
    {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then(response => {
      setRSVPed(response.data.RSVPed);
      toast.success('Registro exitoso! Te llegará más información a través de tu correo institucional.')
    })
    .catch(error =>{
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 405) {
          deleteToken();
          deleteUserId();
          alert(JSON.stringify(location))
          history.push("/login", {from: location, error: 'Debes iniciar sesión para hacer eso.'});
        } else {
          toast.error(error.response.data.message)
        }
      } else {
        toast.error("Hubo un error")
      }
    })
  }

  const _back = _ => {
    history.push("/events")
  }

  const _edit = _ => {

    history.push(`/edit-event?eventId=${eventId}`)
  }

  const _cancel_event = _ => {
    axios.put(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}`, {
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      imgKeys: event.imgKeys,
      endDate: event.endDate,
      location: event.location,
      isRSVP: event.isRSVP,
      RSVPlist: event.RSVPlist,
      studentGroup: event.studentGroup,
      canceled: !canceled
    }).then(response => {
      if (canceled) {
       toast.success("Evento reagendado nuevamente");
      } else {
       toast.success("Evento cancelado correctamente");
      }
      setCanceled(!canceled);
    }).catch(error => {
      let errors = error.response.data.message;
      toast.error(errors);
    });
  }

  const _delete_event = _ => {
    if (!window.confirm("¿Estás segurx de que quieres eliminar este evento?")) {
      return;
    }

    axios.delete(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}`)
     .then(response => {
       toast.success("Evento eliminado correctamente")
       history.push("/events")
     }).catch(error => {
       toast.error(error);
     });
  }

  const _cancel_button = _ => {
    if (!isAdminUser()) {
      return null;
    } else if (canceled) {
      return (
        <div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.coolButton}
            onClick={_cancel_event}
          >
            Reagendar evento
          </Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button disableElevation
          variant="contained"
          color="secondary"
          className={classes.warningButton}
          onClick={_cancel_event}
          style={{color: '#FFFFFF'}}
          >
            Cancelar evento
          </Button>
        </div>
      )
    }
  }

  const _delete_button = _ => {
    if (isAdminUser()) {
      return(
       <div>
        <Button disableElevation
            style={{color: '#FFFFFF'}}
            variant="contained"
            color="secondary"
            className={classes.warningButton}
            onClick={_delete_event}
        >
          Eliminar evento
        </Button>
       </div>
      )
    }
    return null;
  }

  const _edit_button = _ => {
   if (isAdminUser()) {
     return(
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.linkText}
          onClick={ _edit }
        >
          Editar evento
        </Button>
      </div>
     )
   }
   return null;
  }

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}

      />
      <div className={classes.paper}>
        <Grid container style={{"text-align": "left"}}>
          <Box clone  order={{xs: 2, md: 1}}>
            <Grid item md={5} xs={12}>
              <Carousel>
                {
                  event.imgKeys.map((img, i) => {
                    let alt = `Imagen ${i + 1}`
                    let contain = {'object-fit': 'contain'}
                    return (
                      <Image src={img} alt={alt} imageStyle={contain}/>
                    )
                  })
                }
              </Carousel>
            </Grid>
          </Box>
          <Box clone  order={{xs: 1, md: 2}}>
            <Grid item md={7} xs={12} className={classes.title}>
                {canceled?
                  <Typography component='h1' variant='h2' className={classes.canceled}>
                    Evento cancelado
                  </Typography>
                  :
                  ""
                }

                <Typography component='h1' variant='h2'>
                  {event.title}
                </Typography>
                <hr style={{ "width": "70%" }}></hr>
                <Typography component='h2' variant='h4'>
                  {event.studentGroup}
                </Typography>
                <Typography component='h5' variant='h5' style={{color:"#3f3f3f"}}>
                  Inicio: {new Intl.DateTimeFormat("es-MX", {
                    year: "numeric",
                    month: "numeric",
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(event.startDate)}
                </Typography>

                <Typography component='h3' variant='h5' style={{color:"#3f3f3f"}}>
                  Fin: {new Intl.DateTimeFormat("es-MX", {
                    year: "numeric",
                    month: "numeric",
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(event.endDate)}
                </Typography>
                <Typography component='h3' variant='h5'>
                  {event.location}
                </Typography>
                <Typography component='h2' variant='h6'>
                  {event.description}
                </Typography>
                {event.isRSVP?
                  <Button
                      variant="outlined"
                      color="primary"
                      className={classes.linkText}
                      disabled={RSVPed || isAdminUser()}
                      onClick={_RSVP}
                    >
                    {RSVPed? 'RSVPed' : 'RSVP'}
                  </Button>

                    :
                    ''
                }
                { _cancel_button() }
                { _delete_button() }
                { _edit_button() }
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.linkText}
                  onClick={_back}
                >
                  Volver a Eventos
                </Button>
            </Grid>
          </Box>
        </Grid>
      </div>
    </Container>
  )
}

export default EventView;
