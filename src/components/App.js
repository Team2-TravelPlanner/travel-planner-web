import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import SavedTripsList from "./SavedTripsList";
import { Modal, Spinner } from "react-bootstrap";
import Login from "./Login"
import { withRouter } from "react-router-dom";
import { URL, TOKEN_KEY, ID } from '../constants';

class App extends React.Component {
  state = { //states used to activated login or register form.
    showLoginForm: false,
    showRegisterForm: false,
    isLoggedIn: localStorage.getItem(TOKEN_KEY) !== null,
    showSavedTrips: false,
    savedTrips: [],
    isLoadingSavedTrips: false,
    tripPlan: null
  }
  
  getSavedTrips = () => {
    // fetch saved trip list
    const url = `${URL}/plan/getAllPlan`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail:localStorage.getItem(ID),
        token: localStorage.getItem(TOKEN_KEY)
      })
    })
        .then( res => {
          return res.json();
        })
        .then( data => {
          this.setState({
            savedTrips: data.planDisplayModel ? data.planDisplayModel : [],
            isLoadingSavedTrips: false,
            showSavedTrips: true
          });
        })
        .catch(err => {
          console.log('fetch saved trips list error -> ', err);
          this.setState({
            savedTrips: [],
            isLoadingSavedTrips: false,
            showSavedTrips: false
          });
        })
  }

  handleCloseSavedTrips = () => {
    this.setState({
      showSavedTrips: false
    });
  }

  handleOpenSavedTrips = () => {
    this.setState({
      isLoadingSavedTrips: true
    }, () => this.getSavedTrips());
  }

  openTripByPlan = (plan) => {
    // open an unsaved plan object
    this.setState({
      tripPlan: plan,
      showSavedTrips: false
    }, () => {
      if (this.props.location.pathname !== "/trip") 
        this.props.history.push("/trip");
    });
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
        {isLoadingSavedTrips? 
          (<div className="spinner">
            <Spinner animation="border" variant="light"/>
          </div>)
          :
          null
        }
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
        <Main isLoggedIn={this.state.isLoggedIn} tripPlan={this.state.tripPlan} openTripByPlan={this.openTripByPlan}/>
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
              savedTrips={savedTrips} 
              openTrip={this.openTripByPlan} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);

