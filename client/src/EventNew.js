import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Container, Grid, TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast} from 'react-toastify';
import './EventNew.css';
import DatePicker from 'react-datepicker';
import {useHistory} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { isAdminUser } from './TokenUtilities';


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
  history.push("/events", {error: "No tienes permiso para hacer eso."});
}
}

const EventNew = ({ location }) => {
  const history = useHistory();
  const classes = useStyles();
  const _fix_img_urls = (imgKeys) => {
    return imgKeys.split(" ").filter(e => e !== "");
  }
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  
  useEffect(() => {
    userRedirect(history);
  }, [])
  const _createEvent = _ => {
    let title = document.getElementById("title").value;
    let studentGroup = document.getElementById("studentGroup").value;
    let description = document.getElementById("description").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let imgKeys = document.getElementById("imgKeys").value;
    let location = document.getElementById("location").value;
    let isRSVP = document.getElementById("isRSVP").checked;
    let fixed = _fix_img_urls(imgKeys);
    
    let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
    axios.post(`${url}/api/events/`, {
      title: title,
      studentGroup: studentGroup,
      description: description,
      startDate: startDate,
      endDate: endDate,
      imgKeys: fixed,
      location: location,
      isRSVP: isRSVP
    }).then((response) => {
      
      history.push(`/event?eventId=${response.data.event._id}`, "Evento registrado correctamente");
    }).catch(error => {
      let errors = error.response.data.message;
      toast.error(errors);
    });
  }
  
  return(
    <Container component="main" class="main" maxWidth="s">
      <div className={classes.spacing}>
        <h1 className="EventNew-header">Nuevo Evento</h1>
        <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}
        />
        <Grid container>
          <div className="EventNew-InputGrid">
            <div className="EventNew-row">
              <TextField id="title" fullWidth label="Titulo" required/>
              <TextField id="studentGroup" fullWidth label="Grupo que lo organiza"/>
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
                {/* <DatePicker   selected={endDate} onChange={date => setEndDate(date)} showTimeSelect /> */}
                <DatePicker id="endDate"
                selected={endDate}
                onChange={date => setEndDate(date)}
                showTimeSelect
                minDate={startDate}
                />
              </div>
              {/* <TextField id="endDate" fullWidth label="Fecha fin"/> */}
            </div>
            <div className="EventNew-row">
              <TextField id="imgKeys" fullWidth label="URL de fotos (separadas por espacios)"/>
              <TextField id="location" fullWidth label="Lugar"/>
            </div>
          </div>
          <TextField id="description" required fullWidth label="Descripción"/>
          <Checkbox
            name="RSVP"
            color="primary"
            id="isRSVP"
            label="Employed"
          />
          <p>Hacer RSVP</p>
        </Grid>
        <Button variant="contained" color="primary" className={classes.spacingTop} onClick={_createEvent} disableElevation style={{color: '#FFFFFF'}}>
          Crear evento
        </Button>
      </div>
    </Container>
  );
}

export default EventNew;
