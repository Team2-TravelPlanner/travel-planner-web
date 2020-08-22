import React, {Component} from 'react';
import { Button, ListGroup, Card, Spinner } from "react-bootstrap";
import trips from "../data/SavedTrips";

class CreateSavedList extends Component {

    render() {
        const { isLoading } = this.props;

        return (
            <div className="list-main">
                {
                    isLoading ?
                        <Spinner animation="border" role="status" className="custom-spinner-border">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        :
                        <ListGroup>
                            {trips.map((trip) => (
                                <Card key={trip.id} className="card">
                                    <Card.Header>{trip.name}</Card.Header>
                                    <Card.Body>
                                        <p>Start date: {new Date(parseInt(trip.startDate)).toLocaleDateString()}</p>
                                        <p>End date: {new Date(parseInt(trip.endDate)).toLocaleDateString()}</p>
                                        <Button className="detail-btn">Show Plan</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </ListGroup>
                }
            </div>
        );
    }
}

export default CreateSavedList;