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
import {ID} from '../constants';

class App extends React.Component {
  state = { //states used to activated login or register form.
    isLoginForm: false,
    isRegisterForm: false,
    LoginStatus: false,
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

  loginCB = (isLoginData) => {
    this.setState({isLoginForm: isLoginData})
  }

  registerCB = (isRegisterData) => {
    this.setState({isRegisterForm: isRegisterData})
  }
  loginStatusCB = (loginStatus) => {
    this.setState({LoginStatus : loginStatus})
  }

  logOutCB = (LogOutData) => {
    this.setState({LoginStatus : false})
  }

  render() {
    const { showSavedTrips, savedTrips, isLoadingSavedTrips} = this.state;

    return (
      <div className="app">
        <Header isLoginData={this.loginCB}
                isRegisterData={this.registerCB}
                isLogin={this.state.LoginStatus}
                LogOutData={this.logOutCB}
                handleOpenSavedTrips={this.handleOpenSavedTrips}
                loginStatus={this.loginStatusCB}
                />
        <Login isLoginForm={this.state.isLoginForm} 
               isLoginData = {this.loginCB}
               isRegisterForm={this.state.isRegisterForm} 
               isRegisterData={this.registerCB}
               loginStatus={this.loginStatusCB}
               />        
        <Main />
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

