import React from 'react';

import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Explore from "./Explore";
import NotFound from "./NotFound";
import { Modal } from "react-bootstrap";
import Trip from "./Trip"


class Main extends React.Component {

  state = {
    showForm: false,
    tripPlan: null
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

  openTripByPlan(plan) {
    // open an unsaved plan object
    this.setState({
      tripPlan: plan
    }).then( () => {
      this.props.history.location.push("/trip");
    });
  }

  openTripById(tripId) {
    this.props.history.location.push(`/trip/${tripId}`);
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
            <Explore/>
          </Route>
          <Route path="/trip/:id?" render={(props) =>{
            {
              return props.match.params.id? 
                <Trip tripId={props.match.params.id}/>
                :
                <Trip tripPlan={this.state.tripPlan}/>
            }
            
          }} />
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>

        <Modal
          show={showForm}
          backdrop="static"
          keyboard={false}>
          <Modal.Body>
            <Form close={this.closeForm} submit={this.generateItinerary} type="long"/>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default Main;
