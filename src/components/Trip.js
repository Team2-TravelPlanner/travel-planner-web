import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {URL,TOKEN_KEY, ID, GoogleKey} from "../constants";
import axios from "axios";
 
class Trip extends Component {

  dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  times = ["1", "1.5", "2"];

  state = {
    planSaved: this.props.tripPlan? this.props.tripPlan.planId !== null : false,
    daySelected: 0,
    placeSelected: null
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.tripPlan.planId !== this.props.tripPlan.planId) {
      return {
        planSaved: this.props.tripPlan? this.props.tripPlan.planId !== null : false,
        daySelected: 0,
        placeSelected: null
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.setState({
        planSaved: snapshot.planSaved,
        daySelected: snapshot.daySelected,
        placeSelected: snapshot.placeSelected
      });
    }
  }

  randomTimeSpend = () => {
    const randIndex = Math.floor(Math.random() * this.times.length);
    return this.times[randIndex];
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
          console.log(response.data);
          if (response.data.operationResponse.failed === false) {
            this.setState({ planSaved: true });
          }else{
            console.log("save plan failed.");
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

  deselectedPlace = () => {
    this.setState({
      placeSelected: null
    });
  }

  selectedPlace = (id) => {
    this.setState({
      placeSelected: id
    })
  }

  render() {

    // no trip is given
    if (this.props.tripPlan === null) {
      return (
        <Redirect to="/" />
      )
    }

    const { planSaved } = this.state;
    const { tripPlan: trip } = this.props;
    const itinerary = trip.dayOfPlanDisplayModels;
    const startDate = new Date(trip.startDate).toLocaleDateString(undefined, this.dateOptions);
    const endDate = new Date(trip.endDate).toLocaleDateString(undefined, this.dateOptions);

    if (this.state.daySelected >= itinerary.length) {
      return <div></div>
    }

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
                null
                :
                <Button
                  disabled={planSaved}
                  onClick={planSaved ? null : () => this.handleSave(trip)}
                >
                    {planSaved ? "Saving..." : "Save Trip"}
                </Button>
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
            deselectPlace={this.deselectedPlace}
            selectPlace={this.selectedPlace}
          />
        </div>
      </div>
    );
  }
}

export default Trip;
