import React, { Component } from "react";
import "./loading.css";

export class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src="../assets/Spinner.gif" alt="" />
      </div>
    );
  }
}

export default Loading;
