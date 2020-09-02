import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs, Form } from "react-bootstrap";
import trip from "../data/Trip";
import { GoogleKey } from "./Constants";
 
// Open either by tripId of by tripPlan
class Trip extends Component {

  dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  state = {
    isSaving: false,
    daySelected: 0,
    placeSelected: null
  }

  handleSave = () => {
    this.setState({ isSaving: true });

    setTimeout(() => {
      this.setState({ isSaving: false });
    }, 2000);
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
    })
  }

  render() {

    const { tripId, tripPlan: trip } = this.props;
    console.log("tripId: ", tripId);
    console.log("tripPlan: ", trip);

    const { isSaving } = this.state;
    const itinerary = trip.dayOfPlanDisplayModels;
    const days = itinerary.length;
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
        info: "Shimmering art deco skyscraper from 1930 whose spire once made it the world's tallest building.",
        imageUrl: `${item.imageLink}${GoogleKey}`,
        website: item.weblink
      }
    });

    return (
      <div className="trip">
        <div className="dayItem-part">
          <header>
            {tripId?
              <h3>{trip.name}</h3>
              :
              <Form.Group>
                <Form.Control size="lg" type="text" placeholder="Unsaved Trip" />
                <Button
                  disabled={isSaving}
                  onClick={!isSaving ? this.handleSave : null}>
                    {isSaving ? "Saving..." : "Save Trip"}
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
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.placeOfPlanDetailModels.map((item, index) => (
                        <tr key={index} className="table-row" onMouseDownCapture={ () => this.handlePlaceSelected(item.placeId)}>
                          <td>{index + 1}</td>
                          <td>{item.placeName}</td>
                          <td>{item.start? item.start : null}</td>
                          <td>{item.end? item.end: null}</td>
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
