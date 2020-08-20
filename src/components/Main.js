import React from 'react';
<<<<<<< HEAD
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import NotFound from "./NotFound";

class Main extends React.Component {

  state = {

  }

  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/explorer">
            <NotFound />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default Main;