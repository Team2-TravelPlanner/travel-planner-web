import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs, Form } from "react-bootstrap";
import { GoogleKey } from "./Constants";
import { Redirect } from "react-router-dom";
import {URL,TOKEN_KEY, ID} from "../constants";
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

  times = ["1", "1.5", "2", "2.5"];

  randomTimeSpend = () => {
    const randIndex = Math.floor(Math.random() * this.times.length);
    return this.times[randIndex];
  }

  handlePlanNameChange = (e) =>{
    console.log("handle plan name change => ", e);
    this.setState({
      planName: e.target.value
    })
  }

  handleSave = (trip) => {
    console.log("Handle save plan.");
    console.log(trip);
    console.log("save status -> ", this.state.planSaved);
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
    console.log("day details: ", dayDetails);
    console.log("token is: ", localStorage.getItem(TOKEN_KEY).toString());
    console.log("user is : ", localStorage.getItem(ID).toString());

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
          console.log("in then => ", response.data);
          if (response.data.failed === false) {
            console.log("plan saved.");
            this.setState({ planSaved: true });
          }else{
            console.log("save plan failed here 111.");
          }
        }
    )
    .catch(
        err => {
          console.log("error: ", err);
          console.log("save plan failed here 222.");
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

    const { tripId, tripPlan: trip } = this.props;
    console.log("tripId: ", tripId);
    console.log("tripPlan: ", trip);

    if (!tripId && !trip) {
      return (
        <Redirect to="/" />
      )
    }

    const { isSaving, planSaved, planName} = this.state;
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
    console.log("places -> ", places);
    console.log("saving state => ", planSaved);

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
                          <td>{this.randomTimeSpend()}</td>
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
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
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
