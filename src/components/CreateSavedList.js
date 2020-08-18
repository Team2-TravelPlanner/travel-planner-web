import React, {Component} from 'react';
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/cjs/Card";
import Spinner from "react-bootstrap/cjs/Spinner";

class CreateSavedList extends Component {
    constructor() {
        super();
    }

    render() {
        const { tripsInfo, isLoading } = this.props;
        const tripList = tripsInfo ? tripsInfo : [];

        return (
            <div className="list-main">
                <div className="left-side">
                    {
                        isLoading ?
                            <Spinner animation="border" role="status" className="custom-spinner-border">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            :
                            <Accordion className="custom-accordion">
                                {tripList.map((trip)=>(
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey={trip.id}>
                                            {trip.name}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={trip.id}>
                                            <Card.Body>
                                                <p>Start date: {trip.startDate}</p>
                                                <p>End date: {trip.endDate}</p>
                                                <Button className="detail-btn">Show Plan</Button>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))}
                            </Accordion>
                    }
                </div>
                <div className="right-side">
                    Map
                </div>
            </div>
        );
    }
}

export default CreateSavedList;