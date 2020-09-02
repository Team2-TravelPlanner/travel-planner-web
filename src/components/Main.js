import React from 'react';

import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Explore from "./Explore";
import NotFound from "./NotFound";
import { Modal } from "react-bootstrap";
import Trip from "./Trip"
import { URL } from "../constants";
import { withRouter } from "react-router-dom";


class Main extends React.Component {

  state = {
    showForm: false,
    tripPlan: null,
    isLoading: false
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
    const url = `${URL}/plan/recommended`;
    const { style,
      selectedCats,
      lat,
      lon,
      startDate,
      endDate
    } = options;

    console.log(selectedCats);
    this.setState({
      isLoading: true
    })

    fetch(url, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        categories: selectedCats,
        settings: {
          endDate: endDate.toJSON(),
          lat: lat,
          lon: lon,
          startDate: startDate.toJSON(),
          travelStyle: style
        }
      })
    })
    .then(response => response.json())
    .then(plan => {
      this.setState({
        isLoading: false
      });

      this.openTripByPlan(plan);
    })
    .catch(error => {
      this.setState({
        isLoading: false
      });
      console.log('error', error);
    });

    this.setState({
      showForm: false
    });

    console.log(options);
  }

  openTripByPlan(plan) {
    console.log(plan);
    // open an unsaved plan object
    this.setState({
      tripPlan: plan
    }, () => this.props.history.push("/trip"));
  }

  // openTripById(tripId) {
  //   this.props.history.push(`/trip/${tripId}`);
  // }

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
                <Trip tripId={props.match.params.id} isLoggedIn={this.props.isLoggedIn} />
                :
                <Trip tripPlan={this.state.tripPlan} isLoggedIn={this.props.isLoggedIn} />
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

export default withRouter(Main);
