import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image'
import { getUserId, getToken } from './TokenUtilities';
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
  studentGroup: ""
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
    display: 'block'
  }
}));
const EventView = ({ history, location }) => {
  const [event, setEvent] = useState(initialState);
  const [RSVPed, setRSVPed] = useState(false);
  const classes = useStyles();

  location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { eventId } = parsed;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}`)
      .then(response => {
      
        response.data.event.startDate = new Date(response.data.event.startDate)
        response.data.event.endDate = new Date(response.data.event.endDate)

        console.log('response.data.event :>> ', response.data.event);
        setEvent(response.data.event)
        const userId = getUserId()
        if(userId) {
          console.log(getToken())
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
          toast.error(error.response.data.message)
          // history.push("/", {error: error.response.data.message})
        } else {
          toast.error("Hubo un error")
          // history.push('/', {error:"Hubo un error"});
        }      
      })

  }, [eventId, history])

  const _back = _ => {
    history.push("/events")
  }

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer 
          position="top-right"
          draggable={false}
          autoClose={4000}

      />
      <div className={classes.paper}>
        <Grid container >
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
                <Typography component='h1' variant='h2'>
                  {event.title}
                </Typography>
                <Typography component='h2' variant='h4'>
                  {event.studentGroup}
                </Typography>
                <Typography component='h2' variant='h5'>
                  Inicio: {new Intl.DateTimeFormat("es-MX", {
                    year: "numeric",
                    month: "numeric",
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(event.startDate)}
                </Typography>
                <Typography component='h3' variant='h5'>
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
                  Lugar: {event.location}
                </Typography>
                <Typography component='h2' variant='h6'>
                  {event.description}
                </Typography>
                {event.isRSVP?
                  <Button
                      variant="outlined"
                      color="primary"
                      className={classes.linkText}
                      disabled={RSVPed}
                    >
                    {RSVPed? 'RSVPed' : 'RSVP'}
                  </Button>

                    :
                    ''
                }
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