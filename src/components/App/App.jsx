/**
 * AUTHOR: JAMES EASY
 */

/**
 * REACT MODULES
 */
import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

/**
 * BACKPACK COMPONENTS
 */
import BpkTicket from "bpk-component-ticket";
import BpkButton from "bpk-component-button";
import {withButtonAlignment, withRtlSupport} from 'bpk-component-icon';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkPanel from "bpk-component-panel";

/**
 * COMPONENTS
 */
import Header from '../Header';

/**
 * STYLING
 */
import STYLES from './App.scss';
const getClassName = (className) => STYLES[className] || 'UNKNOWN';

/**
 * APPLICATION MAIN FUNCTION
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {

  /**
   * FLIGHT DATA ARRAY
   */
  let [flightData, setFlightData] = useState([]);

  /**
   * RETURNS FLIGHTS.JSON RESULTS
   * @returns {Promise<void>}
   */
  const fetchResults = async () => {
    fetch('http://localhost:5000/').then(data => {
      data.json().then(r => {
        const itineraries = r.itineraries.reduce((acc, item) => {
          const legs = r.legs.filter(leg => item.legs.includes(leg.id))
          return [...acc, {...item, legs}]
        }, [])
        setFlightData(itineraries);
      });
    });
  };

  /**
   * RETURNS FLIGHT CARD USING BACKPACK TICKET AND PANEL COMPONENTS
   * @param props
   * @returns {JSX.Element}
   * @constructor
   */
  const FlightCard = ({props}) => (
    <BpkPanel style={{marginBottom: "2rem"}}>
      <BpkTicket vertical children={
        <div className="ticket-container"
             style={{
               display: "flex",
               flexDirection: "column",
               height: "100%"
             }}>
          {props.legs.map(leg => <FlightLeg {...leg} />)}
          <div className="C">
            <div className="D">{props.departure_time}</div>
            <div>{props.departure_airport}</div>
          </div>
          <div className="E">{props.arrival_time}</div>
          <div>{props.arrival_airport}</div>
        </div>
      }
                 stub={
                   <div className="1">
                     <div className="2">
                       <h2>{props.price}</h2>
                       <h2>{props.agent}</h2>
                     </div>
                     <div className="3" style={{
                       display: "flex",
                       flexDirection: "row-reverse"
                     }}>
                       <BpkButton>Select <AlignedArrowRightIcon
                         fill="white"/></BpkButton>
                     </div>
                   </div>
                 }>
      </BpkTicket>
    </BpkPanel>
  );

  /**
   * ADDS ARROW TO BACKPACK BUTTON
   * @type {*|(function(*): *)}
   */
  const AlignedArrowRightIcon = withButtonAlignment(withRtlSupport(ArrowRightIcon),);

  /**
   * RETURNS FLIGHT LEGS
   * @param props
   * @returns {JSX.Element}
   * @constructor
   */
  const FlightLeg = (props) => {
    return (
      <div className="leg-container"
           style={{display: "flex", flexWrap: "wrap"}}>
        <div className="image-container"
             style={{display: "grid", gridTemplateColumns: "100px"}}>
          <img style={{width: "15vw", height: "5vh"}}
               src={`https://logos.skyscnr.com/images/airlines/favicon/${props.airline_id}.png`}/>
        </div>
        <div className="departure-container"
             style={{display: "grid", gridTemplateColumns: "150px"}}>
          <div className="time-container" style={{fontSize: "1.5rem"}}>
            <div>{props.departure_time.split("T")[1]}<i
              className="fas fa-plane"
              style={{
                position: "relative",
                left: "2rem"
              }}/></div>
          </div>
          <div>{props.departure_airport}</div>
        </div>
        <div className="arrival-container"
             style={{display: "grid", gridTemplateColumns: "100px"}}>
          <div className="time-container" style={{fontSize: "1.5rem"}}>
            <div>{props.arrival_time.split("T")[1]}</div>
          </div>
          <div>{props.arrival_airport}</div>
        </div>
        <div className="duration-container">
          <div>{Math.floor(props.duration_mins / 60)}h{props.duration_mins % 60}</div>
          <h6 className="number-of-stops">Direct</h6>
        </div>
      </div>
    );
  };

  /**
   * PROPTYPES DEFINITIONS (BACKPACK)
   * @type {{props: shim}}
   */
  FlightCard.propTypes = {
    props: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  /**
   * FETCH RESULTS PRE-RENDER
   */
  useEffect(() => {
    fetchResults().then(r => {});
  }, [fetchResults]);

  /**
   * RETURN DOM
   */
  return (
    <div className={getClassName('App')}>
      <Header/>
      <main className={getClassName('App__main')}>
      </main>
      <div>
        {flightData ? flightData.map((flight => <FlightCard props={flight}/>)) : null}
      </div>
    </div>
  );
}

export default App;
