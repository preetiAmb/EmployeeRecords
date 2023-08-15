import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Overview from "../Overview";
import Create from "../Create";
import View from "../View";
import { AppWrapper, GlobalStyle } from "../styled";
import LazyView from "../LazyView";

WebFont.load({
  google: {
    families: ["Open Sans:400,600,700", "sans-serif"],
  },
});

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <Switch>
          <Route path="/edit/:employeeId" component={Create} />
          <Route path="/create" component={Create} />
          <Route path="/view" component={View} />
          <Route path="/" component={Overview} />
          <LazyView />
        </Switch>
      </AppWrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
