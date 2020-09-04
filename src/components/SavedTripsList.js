import React, { Component } from "react";
import { Button, ListGroup, Card, Spinner } from "react-bootstrap";

class SavedTripsList extends Component {

  handleOpenTrip = (id) => {
    this.props.openTrip(id);
  }
  render() {
    const { savedTrips, isLoading } = this.props;

    return (
      <div className="saved-trips-list">
        {isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className="custom-spinner-border"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <ListGroup>
            {savedTrips.map((trip) => (
              <Card key={trip.planId} className="card">
                <Card.Header>Trip {savedTrips.indexOf(trip)}</Card.Header>
                <Card.Body>
                  <p>
                    Start date:{" "}
                    {new Date(trip.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    End date:{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                  <Button className="detail-btn" variant="dark" onClick={ () => this.handleOpenTrip(trip.planId)}>Open Trip</Button>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        )}
      </div>
    );
  }
}

export default SavedTripsList;
