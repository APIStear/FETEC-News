import { useEffect, useState } from "react";
import Banner from "./banner";
import Gallery from './gallery'
import SpecialEvents from "./specialEvents";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);


  const getNextEvents = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events?startDate=${new Date()}&page=1&pageSize=4`)
      .then(response => {
        setNextEvents(response.data.events);
      })
      .catch(error =>{
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Hubo un error");
        }
      })
  }

  const getPastEvents = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events?endDate=${new Date()}&page=1&pageSize=6`)
      .then(response => {
        setPastEvents(response.data.events);

      })

      .catch(error =>{
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Hubo un error");
        }
      })
  }

  useEffect(() => {
    document.title = 'Comité Ejecutivo'
    if(location && location.state && location.state.error !== "") {
      if(location.state.error !== "") {
        toast.error(location.state.error)
      }
      if(location.state.success !== "") {
        toast.success(location.state.success)
      }
    }


    getNextEvents();
    getPastEvents();
  }, [location])

  return (
    <div>
      <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}
      />
      <Banner
          data={{ title: "Comité Electoral", paragraph: "Eventos Estudiantiles" }}
      />
      <SpecialEvents data={nextEvents} />
      <Gallery data={pastEvents} />
    </div>
  )
}

export default Home;
