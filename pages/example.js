import React, { Component } from "react";
import $ from "jquery";

export default class example extends Component {
  handleClick = () => {
    $("#comp").css("background-color", "yellow");
  };

  render() {
    return (
      <div>
        <button id="comp" onClick={this.handleClick}>
          hello
        </button>
      </div>
    );
  }
}
