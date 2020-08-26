import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs, Form } from "react-bootstrap";
import trip from "../data/Trip";

// Open either by tripId of by tripPlan
class Trip extends Component {

  dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  state = {
    isSaving: false,
    daySelected: 0
  }

  handleSave = () => {
    this.setState({ isSaving: true });

    setTimeout(() => {
      this.setState({ isSaving: false });
    }, 2000);
  };

  handleDaySelected = (daySelected) => {
    console.log(typeof(daySelected));
    this.setState({
      daySelected: daySelected - 1   // to index
    });
  }

  render() {

    const { tripId, tripPlan } = this.props;
    console.log("tripId: ", tripId);
    console.log("tripPlan: ", tripPlan);

    const { isSaving } = this.state;
    const itinerary = trip.itinerary;
    const days = itinerary.length;
    const startDate = new Date(parseInt(trip.startDate)).toLocaleDateString(undefined, this.dateOptions);
    const endDate = new Date(parseInt(trip.endDate)).toLocaleDateString(undefined, this.dateOptions);

    const places = trip.itinerary[this.state.daySelected].map( item => (
      item.place
    ));

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
                      {day.map((item, index) => (
                        <tr key={index} className="table-row">
                          <td>{index + 1}</td>
                          <td>{item.place.name}</td>
                          <td>{item.start}</td>
                          <td>{item.end}</td>
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
          />
        </div>
      </div>
    );
  }
}

export default Trip;
