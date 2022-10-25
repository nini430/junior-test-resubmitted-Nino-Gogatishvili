import React, { Component } from "react";
import "./hamburgerMenu.css";

class HamburgerMenu extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.toggleSideBar()}
        className="hamburgerMenu show"
      >
        <div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }
}

export default HamburgerMenu;
