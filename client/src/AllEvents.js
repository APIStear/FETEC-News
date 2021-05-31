import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import './AllEvents.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// TODO: Esto solo puede ser accesado como admin
const AllEvents = ({ history, location }) => {

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
                <div className="EventDateDay">
                  {new Intl.DateTimeFormat("es-MX", {
                    day: "numeric",
                  }).format(event.startDate)}
                </div>
                <div>
                  {new Intl.DateTimeFormat("es-MX", {
                    month: "long",
                  }).format(event.startDate).toLocaleUpperCase()}
                </div>
              </div>
              <div className="EventTitleOrg">
                <div className="EventTitle"> {event.title} </div>
                <div className="EventDetails"> {event.studentGroup} </div>
              </div>
              <div className="EventLocation">
                <div className="EventDetails"> {event.location} </div>
              </div>
              <div className="EventDetails">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/event?eventId=${event._id}`}
                disableElevation
              >
                Ver más
              </Button>
              </div>
            </div>
            <hr></hr>
          </div>
      )})
        setEvents(allEvents)
      }).catch(error => {
        history.push('/', {error:"Hubo un error"});
        console.log(error);
      });
  }, [eventList, history, location]);

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

export default AllEvents;
