import React, {Component} from 'react';
import Button from "react-bootstrap/cjs/Button";
import ListGroup from "react-bootstrap/cjs/ListGroup";
import Card from "react-bootstrap/cjs/Card";
import Spinner from "react-bootstrap/cjs/Spinner";

class CreateSavedList extends Component {
    constructor() {
        super();
    }

    render() {
        const { tripsInfo, isLoading } = this.props;
        const tripList = tripsInfo ? tripsInfo : [];
        console.log(tripList);

        return (
            <div className="list-main">
                {
                    isLoading ?
                        <Spinner animation="border" role="status" className="custom-spinner-border">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        :
                        <ListGroup>
                            {tripList.map((trip) => (
                                <Card>
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