import React, { Component } from "react";
import { Button, ListGroup, Card, Spinner } from "react-bootstrap";

class SavedTripsList extends Component {

  handleShowTrip = (id) => {
    this.props.showTrip(id);
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
              <Card key={trip.id} className="card">
                <Card.Header>{trip.name}</Card.Header>
                <Card.Body>
                  <p>
                    Start date:{" "}
                    {new Date(parseInt(trip.startDate)).toLocaleDateString()}
                  </p>
                  <p>
                    End date:{" "}
                    {new Date(parseInt(trip.endDate)).toLocaleDateString()}
                  </p>
                  <Button className="detail-btn" onClick={ () => this.handleShowTrip(trip.id)}>Show Plan</Button>
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
