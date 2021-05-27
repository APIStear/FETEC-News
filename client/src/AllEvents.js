import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import './AllEvents.css';
import { Button, Container, Grid, TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from "date-fns";




// TODO: Esto solo puede ser accesado como admin
export default function AllEvents() {
  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);


  useEffect(() => {
    axios.get(`${url}/api/events/`)
      .then(response => {
        let events = response.data.events
        let allEvents = events.map((event) => {
          event.startDate = new Date(event.startDate)
          return (
          <div key={event.title}>
            <div className="EventCard">
              <div className="EventDate">
                  <div className="EventDateDay">{new Intl.DateTimeFormat("es-MX", {
                        day: "numeric",
                      }).format(event.startDate)}</div>
                  <div>{new Intl.DateTimeFormat("es-MX", {
                      month: "long",
                    }).format(event.startDate).toLocaleUpperCase()}</div>
                {/* {event.startDate.getMonth()} */}
              </div>
              <div className="EventTitleOrg">
                <div className="EventTitle"> {event.title} </div>
                <div className="EventDetails"> {event.studentGroup} </div>
              </div>
              <div className="EventLocation">
                <div className="EventDetails"> {event.location} </div>
              </div>
              <div className="EventDetails">
              <Button variant="contained" color="primary" disableElevation>
                Ver más
              </Button>
              </div>
            </div>
            {/* <Typography component="h5" variant="h5">
                <Typography component="body2" variant="body2">
                  <div> Descripción: {event.description} </div>

                </Typography>
            </Typography> */}
            <hr></hr>
          </div>
      )})
        setEvents(allEvents)
      }).catch(error => {
        console.log(error);
      });
  });

  return (
    <div className="EventsMain" >
      <h1>Próximos Eventos</h1>
      <div className="columnHeaders" >
        <h2 className="EventDate">Fecha</h2>
        <h2 className="EventTitleOrg">Evento</h2>
        <h2 className="EventLocation">Lugar</h2>
      </div>
      <div className="EventsContainer">
          {eventList}
      </div>
    </div>
  );
}
