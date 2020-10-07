import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QuestionListPage } from "./pages/index";
import { IndexPage, AboutMePage } from "./pages";
import QuestionDetailPage from "./pages/QuestionDetailPage";

function App() {
  return (
    <React.Fragment>
      <meta charSet="utf-8"></meta>

      <div className="App">
        <Router>
          <Route path="/" exact>
            <IndexPage />
          </Route>
          <Route path="/list">
            <QuestionListPage />
          </Route>
          <Route path="/me">
            <AboutMePage />
          </Route>
          <Route path="/question:id">
            <QuestionDetailPage />
          </Route>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
