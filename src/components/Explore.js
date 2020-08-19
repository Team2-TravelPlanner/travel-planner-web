import React, {Component} from 'react';
import {Card, ListGroup, FormControl, Form, Button} from 'react-bootstrap'
class Explore extends Component {
    render() {
        return (
            <div>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="primary">Search</Button>
                </Form>
                <br/>
                <Card style={{ width: '30em' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

export default Explore;
