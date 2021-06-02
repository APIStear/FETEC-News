import React from 'react';
import axios from "axios";
import { Button, Container, Grid, TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './EventNew.css';
import { isAdminUser } from './TokenUtilities';


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
  spacingBottom: {
    marginBottom: theme.spacing(4),
  },

  spacingTop: {
    marginTop: theme.spacing(4),
  }
}));

function userRedirect(history) {
  if (!isAdminUser()) {
    history.push("/events");
  }
}

const EditEvent = ({ history, location }) => {
  const classes = useStyles();

  userRedirect(history);

  const _fix_img_urls = (imgKeys) => {
    return imgKeys.split(" ").filter(e => e !== "");
  }
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [event, setEvent] = useState(initialState);

  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { eventId } = parsed;

  useEffect(() => {
   axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}`)
     .then(response => {
       let event = response.data.event
       let sDate = new Date(event.startDate);
       let eDate = new Date(event.startDate);
       setEvent(event);
       setStartDate(sDate);
       setEndDate(eDate);

       document.title = `Editar ${response.data.event.title} | Comité Ejecutivo`
       console.log(event);
     }).catch(error => {
       console.log(error);
     });
  }, [eventId, history, location]);

  const _editEvent = _ => {
    let title = document.getElementById("title").value;
    let studentGroup = document.getElementById("studentGroup").value;
    let description = document.getElementById("description").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let imgKeys = document.getElementById("imgKeys").value;
    let location = document.getElementById("location").value;
    let isRSVP = document.getElementById("isRSVP").checked;

    let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
    axios.put(`${url}/api/events/${eventId}`, {
      title: title,
      studentGroup: studentGroup,
      description: description,
      startDate: startDate,
      endDate: endDate,
      imgKeys: _fix_img_urls(imgKeys),
      location: location,
      isRSVP: isRSVP
    }).then((response) => {
      toast.success("Evento editado correctamente")
      history.push(`/event?eventId=${eventId}`);
    }).catch(error => {
      let errors = error.response.data.message;
      toast.error(errors);
    });
  }

  return(
    <Container component="main" maxWidth="lg">
      <div className={classes.spacing}>
        <h1 className="EventNew-header">Editar Evento</h1>
        <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}
        />
        <Grid container>
          <div className="EventNew-InputGrid">
            <div className="EventNew-row">
              <TextField name="title" id="title" fullWidth label="Titulo" value={event.title} onChange={e => setEvent({...event, title: e.target.value})}/>
              <TextField id="studentGroup" name="studentGroup" fullWidth label="Grupo que lo organiza" value={event.studentGroup} onChange={e => setEvent({...event, studentGroup: e.target.value})}/>
            </div>
            <div className="EventNew-row">
              <div className="EventDate">
                <p>Fecha de inicio: </p>
                <DatePicker id="startDate"
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect />
              </div>
              <div className="EventDate">
                <p>Fecha de fin: </p>
                <DatePicker id="endDate"
                selected={endDate}
                onChange={date => setEndDate(date)}
                showTimeSelect
                minDate={startDate}
                />
              </div> </div>
            <div className="EventNew-row">
              <TextField id="imgKeys" fullWidth label="URL de fotos" name="imgKeys" value={event.imgKeys.join(" ")} onChange={e => setEvent({...event, imgKeys: _fix_img_urls(e.target.value)})}/>
              <TextField id="location" fullWidth label="Lugar" name="location" value={event.location} onChange={e => setEvent({...event, location: e.target.value})} />
            </div>
          </div>
          <TextField id="description" required fullWidth label="Descripción" name="description" value={event.description} onChange={e => setEvent({...event, description: e.target.value})} />
          <Checkbox
            name="RSVP"
            color="primary"
            id="isRSVP"
            label="Employed"
            checked={event.isRSVP}
            onChange={e => setEvent({...event, isRSVP: e.target.value })}
            // defaultChecked={`${event.isRSVP}`}
          />
          <p>Hacer RSVP</p>
        </Grid>
        <Button variant="contained" color="primary" className={classes.spacingTop} onClick={_editEvent}>
          Editar evento
        </Button>
      </div>
    </Container>
  );
}

export default EditEvent;
