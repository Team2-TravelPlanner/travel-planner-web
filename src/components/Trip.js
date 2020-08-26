import React, { Component } from "react";
import Map from "./NewYorkMap";
import { Tab, Button, Table, Tabs } from "react-bootstrap";
import trip from "../data/Trip";

class Trip extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isSaving: false,
    };
  }

  handleClick = () => {
    this.setState({ isSaving: true });

    setTimeout(() => {
      this.setState({ isSaving: false });
    }, 2000);
  };

  render() {
    const { isSaving } = this.state;
    const itinerary = trip.itinerary;
    const days = itinerary.length;

    return (
      <div className="trip">
        <div className="dayItem-part">
          <Tabs defaultActiveKey={1} variant="tabs">
            {itinerary.map((day, index) => (
              <Tab eventKey={index + 1} title={`Day ${index + 1}`}>
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
          <Button
            disabled={isSaving}
            onClick={!isSaving ? this.handleClick : null}
          >
            {isSaving ? "Saving..." : "Save Plan"}
          </Button>
        </div>

        <div className="map-part">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default Trip;
