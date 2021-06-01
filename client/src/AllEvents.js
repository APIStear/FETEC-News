import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import './AllEvents.css';
import EventList from './EventList';

// TODO: Esto solo puede ser accesado como admin
const AllEvents = ({ history, location }) => {

  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/events/`)
      .then(response => {
        const events = response.data.events 
        setEvents(events);
      }).catch(error => {
        history.push('/', {error:"Hubo un error"});
        console.log(error);
      });
  }, [eventList, history, location, url]);

  return (
    <div className="EventsMain" >
      <h1>Próximos Eventos</h1>
      <EventList events={eventList}/>
    </div>
  );
}

export default AllEvents;
