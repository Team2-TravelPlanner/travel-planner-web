import React from 'react';

import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Explore from "./Explore";
import NotFound from "./NotFound";
import { Modal, Spinner } from "react-bootstrap";
import Trip from "./Trip"
import { URL } from "../constants";


class Main extends React.Component {

  state = {
    showForm: false,
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

      this.props.openTripByPlan(plan);
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

  }


  render() {
    const { showForm, isLoading } = this.state;

    return (
      <div className="main">
        {isLoading? 
          (<div className="spinner">
            <Spinner animation="border" variant="light"/>
          </div>)
          :
          null
        }

        <Switch>
          <Route exact path="/">
            <Home openForm={this.openForm} />
          </Route>
          <Route exact path="/explorer">
            <Explore openTripByPlan={this.props.openTripByPlan} />
          </Route>
          <Route path="/trip">
            <Trip tripPlan={this.props.tripPlan} isLoggedIn={this.props.isLoggedIn} />
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
            <Form close={this.closeForm} submit={this.generateItinerary} type="long"/>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default withRouter(Main);
