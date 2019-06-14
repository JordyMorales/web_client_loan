import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Home from "../views/Home/Home";
import Customer from "../views/Customer/Customer";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/customer" exact component={Customer} />
    </Switch>
  </Router>
);
