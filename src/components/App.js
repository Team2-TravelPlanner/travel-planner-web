import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import SavedTripsList from "./SavedTripsList";
import { Modal } from "react-bootstrap";
import savedTrips from "../data/SavedTrips";
import Login from "./Login"
import { withRouter } from "react-router-dom";
import {TOKEN_KEY} from '../constants';

class App extends React.Component {
  state = { //states used to activated login or register form.
    showLoginForm: false,
    showRegisterForm: false,
    isLoggedIn: localStorage.getItem(TOKEN_KEY) !== null,
    showSavedTrips: false,
    savedTrips: [],
    isLoadingSavedTrips: false,
  }
  
  getSavedTrips = () => {
    // fetch saved trip list
    // ...
    this.setState({
        savedTrips: savedTrips,
        isLoadingSaved: false
    });
  }

  handleCloseSavedTrips = () => {
    this.setState({
      showSavedTrips: false
    });
  }

  handleOpenSavedTrips = () => {
    this.getSavedTrips();
    this.setState({
      showSavedTrips: true
    });
  }

  openTripById = (id) => {
    this.setState({
      showSavedTrips: false
    });

    this.props.history.push(`/trip/${id}`);
  }

  showLoginForm = (show) => {
    this.setState({
      showLoginForm: show
    });
  }

  showRegisterForm = (show) => {
    this.setState({
      showRegisterForm: show
    });
  }

  loggedIn = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  loggedOut = () => {
    this.setState({
      isLoggedIn : false
    });
  }

  render() {
    const { showSavedTrips, savedTrips, isLoadingSavedTrips} = this.state;

    return (
      <div className="app">
        <Header showLoginForm={this.showLoginForm}
                showRegisterForm={this.showRegisterForm}
                isLoggedIn={this.state.isLoggedIn}
                loggedOut={this.loggedOut}
                handleOpenSavedTrips={this.handleOpenSavedTrips}
                />
        <Login isLoginForm={this.state.showLoginForm} 
               isRegisterForm={this.state.showRegisterForm} 
               showLoginForm = {this.showLoginForm}
               showRegisterForm={this.showRegisterForm}
               loggedIn={this.loggedIn}
               />        
        <Main isLoggedIn={this.state.isLoggedIn}/>
        <Footer />

        <Modal
          show={showSavedTrips}
          onHide={this.handleCloseSavedTrips}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Saved Trips</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SavedTripsList 
              isLoading={isLoadingSavedTrips} 
              savedTrips={savedTrips} 
              openTrip={this.openTripById} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);

