import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
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
            <NotFound />
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