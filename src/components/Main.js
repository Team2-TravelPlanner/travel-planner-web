import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import NotFound from "./NotFound";
import { Modal } from "react-bootstrap";

class Main extends React.Component {

  state = {
    showForm: false
  }

  openForm = () => {
    this.setState({
      showForm: true
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false
    });
  }

  generateItinerary = (options) => {
    this.setState({
      showForm: false
    });

    console.log(options);
  }

  render() {
    const { showForm } = this.state;

    return (
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home openForm={this.openForm} />
          </Route>
          <Route exact path="/explorer">
            <NotFound />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>

        <Modal
          show={showForm}
          backdrop="static"
          keyboard={false}>
          <Modal.Body>
            <Form close={this.closeForm} generateItinerary={this.generateItinerary} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Main;