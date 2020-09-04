import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {URL,TOKEN_KEY, ID, GoogleKey} from "../constants";
import axios from "axios";
 
// Open either by tripId of by tripPlan
class Trip extends Component {

  dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  state = {
    planSaved: false,
    daySelected: 0,
    placeSelected: null,
    planName: null
  }

  times = ["1", "1.5", "2"];

  constructor(props) {
    super();
    let trip = props.tripPlan? props.tripPlan : null;
    if (trip) {
      trip.dayOfPlanDisplayModels.forEach( (day, dIndex) => {
        day.placeOfPlanDetailModels.forEach( (place, pIndex) => {
          trip.dayOfPlanDisplayModels[dIndex].placeOfPlanDetailModels[pIndex].hours = this.randomTimeSpend();
        });
      });
    }
    this.state = {
      planSaved: false,
      daySelected: 0,
      placeSelected: null,
      planName: null,
      trip: trip
    }
  }


  componentDidUpdate(prevProps, prevState) {

  }

  randomTimeSpend = () => {
    const randIndex = Math.floor(Math.random() * this.times.length);
    return this.times[randIndex];
  }

  handlePlanNameChange = (e) =>{
    this.setState({
      planName: e.target.value
    })
  }

  handleSave = (trip) => {

    this.setState({ planSaved: true });

    const url =  `${URL}/plan/save`;
    const dayPlan = trip.dayOfPlanDisplayModels;
    const dayDetails = dayPlan.map(oneday => {
      return {
        index: oneday.index,
        placeOfPlanSaveModels:
          oneday.placeOfPlanDetailModels.map(item => {
            return {
              endDate: "",
              placeId: item.placeId.toString(),
              startDate: ""
            }
          })
        }
    });

    axios({
      method: 'POST',
      header: {"Content-Type": "application/json"},
      url: url,
      data: {
        authModel: {
          token: localStorage.getItem(TOKEN_KEY).toString(),
          userEmail: localStorage.getItem(ID).toString()
        },
        dayOfPlanSaveModels: dayDetails,
        endDate: trip.endDate,
        planId: trip.planId,
        startDate: trip.startDate,
        startLatitude: trip.startLatitude,
        startLongitude: trip.startLongitude,
        typeOfPlan: trip.typeOfPlan
      }
    })
    .then(
        response => {
          if (response.data.failed === false) {
            this.setState({ planSaved: true });
          }else{
            console.log("save plan failed here 111.");
          }
        }
    )
    .catch(
        err => {
          console.log("error: ", err);
        }
    )
  };

  handleDaySelected = (daySelected) => {
    this.setState({
      daySelected: daySelected - 1,   // to index
      placeSelected: null
    });
  }

  handlePlaceSelected = (placeId) => {
    this.setState({
      placeSelected: placeId
    });
  }

  render() {

    const { tripId } = this.props;
    const { trip } = this.state;

    if (!tripId && !trip) {
      return (
        <Redirect to="/" />
      )
    }

    const { planSaved, planName} = this.state;
    const itinerary = trip.dayOfPlanDisplayModels;
    const startDate = new Date(trip.startDate).toLocaleDateString(undefined, this.dateOptions);
    const endDate = new Date(trip.endDate).toLocaleDateString(undefined, this.dateOptions);

    const places = itinerary[this.state.daySelected].placeOfPlanDetailModels.map( item => {
      return {
        id: item.placeId,
        name: item.placeName,
        address: item.address,
        lat: item.lat,
        lon: item.lon,
        categories: item.categories,
        info: "",
        imageUrl: `${item.imageLink}${GoogleKey}`,
        website: item.weblink
      }
    });

    return (
      <div className="trip">
        <div className="dayItem-part">
          <header>
            {
              planSaved ?
                <h3>
                  {planName}
                </h3>
                :
                <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Unsaved Trip" onChange={this.handlePlanNameChange}/>
                  <Button
                    disabled={planSaved}
                    onClick={planSaved ? null : () => this.handleSave(trip)}
                  >
                      {planSaved ? "Saving..." : "Save Trip"}
                  </Button>
                </Form.Group>
            }
          </header>
          <div className="travel-dates">
            {startDate} - {endDate}
          </div>
          <Tabs defaultActiveKey={1} variant="tabs" onSelect={this.handleDaySelected}>
            {itinerary.map((day, index) => (
              <Tab 
                  eventKey={index + 1} 
                  title={`Day ${index + 1}`} 
                  key={index + 1}>
                <div className="tab">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Place</th>
                        <th>Time to spend (Hours)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.placeOfPlanDetailModels.map((item, index) => (
                        <tr key={index} className="table-row" onMouseDownCapture={ () => this.handlePlaceSelected(item.placeId)}>
                          <td>{index + 1}</td>
                          <td>{item.placeName}</td>
                          <td>{item.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>

        <div className="map-part">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={places}
            selectedPlaceId={this.state.placeSelected}
            showRoute={true}
          />
        </div>
      </div>
    );
  }
}

export default Trip;
