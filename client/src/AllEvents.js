import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import './AllEvents.css';
import Searchbar from './Searchbar';
import EventList from './EventList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: Esto solo puede ser accesado como admin
const AllEvents = ({ history, location }) => {

  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);

  useEffect(() => {
    if(location && location.state && location.state.error !== "") {
      if(location.state.error !== "") {
        toast.error(location.state.error)
      }
      if(location.state.success !== "") {
        toast.success(location.state.success)
      }
    }
    axios.get(`${url}/api/events?sort=startDate&startDate=${new Date()}`)
      .then(response => {
        const events = response.data.events
        setEvents(events);
      }).catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Hubo un error");
        }
      });
  }, [history, location, url]);

  const _search = value => {
    if(value !== '') {
      value = `&title=${value}`
    }
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events?sort=startDate&startDate=${new Date()}${value}`)
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
    <div className="EventsMain" >
      <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}
      />
      <h1>Próximos Eventos</h1>
      <Searchbar onChange={_search}/>
      <EventList events={eventList} toast={toast}/>
    </div>
  );
}

export default AllEvents;
