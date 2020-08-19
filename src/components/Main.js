import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Plans from "./Plans"

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <switch>
            <Route path="/plans" render={this.getPlanDisplay}/>
        </switch>
      </div>
    )
  }
    getPlanDisplay = () => {
        // return this.props.isLoggedIn ?
        //     <Redirect to="/plansDisplay"/> : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>
        return <Plans />
    }
}

export default Main;