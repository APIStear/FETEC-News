import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { isAdminUser } from "./TokenUtilities";
import Icon from '@material-ui/core/Icon';
import { useState } from "react";
import RSVPtable from "./RSVPtable";

const useStyles = makeStyles((theme) => ({
  linkText: {
    margin: theme.spacing(1,0),
    textDecoration: `none`,
    color: `white`
  },
  linkTextFirst: {
    margin: theme.spacing(1,0),
    textDecoration: `none`,
  },
}))

const EventList = ({events, toast}) => {
  const classes = useStyles();
  const _get_buttons = (event) => {
    if (window.location.href.includes("/dashboard")) {
      return (
        <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to={`/edit-event?eventId=${event._id}`}
            disableElevation
            className={`${classes.linkText}`}
        >
          Editar
        </Button>
      )
    }
  }


  const [expanded, setExpanded] = useState(events.map(() => false))

  return (
    <div>

      <div className="columnHeaders" >
          <h2 className="EventDate">Fecha</h2>
          <h2 className="EventTitleOrg">Evento</h2>
          <h2 className="EventLocation">Lugar</h2>
      </div>
      <div className="EventsContainer">

        {
          events.map((event, i) => {
            event.startDate = new Date(event.startDate)
            return (
              <div key={event._id}>
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
                    <Button fullWidth style={{marginTop: "5px"}}
                     variant="outlined"
                      color="primary"
                      component={Link}
                      className={classes.linkTextFirst}
                      to={`/event?eventId=${event._id}`}
                      disableElevation
                      
                    >
                      Ver más
                    </Button>
                    {
                      isAdminUser() ?
                        _get_buttons(event)
                      : ''
                    }
                    {
                      isAdminUser() && event.isRSVP ?
                      <Button
                          fullWidth
                          disableElevation
                          variant="contained"
                          color="primary"
                          className={classes.linkText}
                          onClick={() => {
                            let allExpanded = [...expanded];
                            let thisExpanded = expanded[i];
                            thisExpanded = !thisExpanded;
                            allExpanded[i] = thisExpanded;
                            setExpanded(allExpanded)
                          }}
                          endIcon={expanded[i]? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                      >
                        {expanded[i]? 'Cerrar' : 'Ver RSVPed'}
                      </Button>
                      :
                      ''
                    }

                  </div>
                </div>
                {
                  isAdminUser() && expanded[i] && event.isRSVP ?
                    <RSVPtable eventId={event._id} toast={toast} />
                  :
                  ''
                }

                <hr></hr>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default EventList;
