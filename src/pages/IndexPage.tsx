import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import "./pages.css";

export default class IndexPage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <h3>
          This website is used to help you practise for the upcoming interview
        </h3>
        <h3>
          You can read, vote all the question and all answers and post new
          questions <br />
          that you have been asked before
        </h3>
        <h3>Hope it helps,</h3>
        <h3>and please support this community together</h3>
        <div className="bottomGroup">
          <div>
            <Link to="/me">
              <h4> Jiawei</h4>
            </Link>
          </div>
          <Button variant="contained" color="primary" href="/list">
            Questions
          </Button>
        </div>
      </div>
    );
  }
}
