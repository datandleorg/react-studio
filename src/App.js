import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageBuilderContainer from "./containers/PageBuilderContainer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* added router just in case */}
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <PageBuilderContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
