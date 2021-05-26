import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import './AllEvents.css';
import { Button } from '@material-ui/core';
import { format } from "date-fns";

// TODO: Esto solo puede ser accesado como admin
export default function AllEvents() {
  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/events/`)
      .then(response => {
        let events = response.data.events
        let allEvents = events.map((event) =>
          <div key={event.title}>
            <div className="EventCard">
              <div className="EventDate">
                <div> inicio: {event.startDate} </div>
              </div>
              <div className="EventTitleOrg">
                <div className="EventTitle"> {event.title} </div>
                <div className="EventDetails"> {event.studentGroup} </div>
              </div>
              <div className="EventLocation">
                <div className="EventDetails"> {event.location} </div>
              </div>
              <div className="EventDetails">
              <Button variant="contained" color="primary" >
                Ver más
              </Button>
              </div>
            </div>
            <hr></hr>
          </div>
        )
        setEvents(allEvents)
      }).catch(error => {
        console.log(error);
      });
  });

  return (
    <div>
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
