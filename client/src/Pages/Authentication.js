import React, { Component, Fragment } from "react";
import { LoginForm } from "../Components/LoginForm";
import { RegisterForm } from "../Components/RegisterForm";
import {Dashboard} from "../Components/Dashboard"
export class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOn: true
    };
  }

  changeDisplayForm = value => {
    this.setState({ loginOn: !this.state.loginOn });
  };

  render() {
    return (
      <Fragment>
        {this.state.loginOn ? (
          <LoginForm changeForm={this.changeDisplayForm} />
        ) : (
          <RegisterForm changeForm={this.changeDisplayForm} />
        )}{" "}
      </Fragment>
    );
  }
}
