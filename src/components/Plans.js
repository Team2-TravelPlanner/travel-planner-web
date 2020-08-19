import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";
import NavItem from "react-bootstrap/NavItem";

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
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ListGroup>
                                        <ListGroup.Item>Central Park</ListGroup.Item>
                                    </ListGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ListGroup>
                                        <ListGroup.Item>Museum</ListGroup.Item>
                                    </ListGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>

                        <Col sm={5}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Day 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Day 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Tab.Container>
                </div>


                <div className="map-part">
                    map
                </div>

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