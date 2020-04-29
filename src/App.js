import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

const PageBuilderContainer = React.lazy(() => import("./containers/PageBuilderContainer"));

function App() {
  return (
    <div className="App">
      {/* added router just in case */}
      <Header />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={PageBuilderContainer}></Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
