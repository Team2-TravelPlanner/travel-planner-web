import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table";

class Plans extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isSaving: false
        };
    }

    handleClick() {
        this.setState({ isSaving: true });

        setTimeout(() => {
            this.setState({ isSaving: false });
        }, 2000);
    }

    render() {
        const { isSaving } = this.state;

        return (
            <div className='main'>
                <div className="dayItem-part">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={9}>
                                <div className='list-box'>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div className='table-head'>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Place</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                    </tr>
                                                    </thead>
                                                </Table>
                                            </div>

                                            <div className='table-content'>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Place</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Central Park</td>
                                                            <td>10 : 00 AM</td>
                                                            <td>11 : 00 AM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>5</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>6</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>7</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>8</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>9</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                        <tr>
                                                            <td>9</td>
                                                            <td>Museum</td>
                                                            <td>11 : 30 AM</td>
                                                            <td>12 : 30 PM</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Tab.Pane>


                                        <Tab.Pane eventKey="second">
                                            <div className='table-head'>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Place</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                    </tr>
                                                    </thead>
                                                </Table>
                                            </div>

                                            <div className='table-content'>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Place</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Central Park</td>
                                                        <td>10 : 00 AM</td>
                                                        <td>11 : 00 AM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>Museum</td>
                                                        <td>11 : 30 AM</td>
                                                        <td>12 : 30 PM</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </Col>

                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Day 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Day 2</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                        </Row>
                    </Tab.Container>
                </div>

                {/*<div className="map-part">*/}
                {/*    map*/}
                {/*</div>*/}

                <div className = "save-part">
                    <Button
                        bsStyle="primary"
                        disabled={isSaving}
                        onClick={!isSaving ? this.handleClick : null}
                    >
                        {isSaving ? 'Saving...' : 'Save Plan'}
                    </Button>
                </div>
            </div>
        );
    }
}

export default Plans;