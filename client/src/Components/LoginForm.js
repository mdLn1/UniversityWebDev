import React from "react";
import styles from "./LoginForm.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      loggedIn: false
    };
    this.changeForm = this.props.changeForm;
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
    this.setState({ emailError: false});
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
    this.setState({ passwordError: false});
  };

  handleSubmit = async e => {
    if (!this.state.email && !this.state.password) {
      this.setState({ emailError: true});
      this.setState({ passwordError: true});
      return;
    } else if (!this.state.email) {
      this.setState({ emailError: true});
      this.setState({ passwordError: false});
      return;
    } else if (!this.state.password) {
      this.setState({ emailError: false});
      this.setState({ passwordError: true});
      return;
    } else {
      this.setState({ emailError: false});
      this.setState({ passwordError: false});
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const obj = { email: this.state.email, password: this.state.password };
      const res = await axios.post("/api/auth/login/", obj, config);
      localStorage.setItem("token", res.data.token);
      console.log( "token:" + res.data.token);
      this.setState({ loggedIn: true });
    } catch (err) {
      window.alert('Login Failed Wrong User/Password Combination');
    }
  };

  render() {
    const loggedIn = this.state.loggedIn;
    if (loggedIn) return <Redirect to="/dashboard" />;
    else
      return (
        <div className={styles.page}>
          <div className={styles.divcontainer}>
            <img
              className={styles.loginImage}
              src="https://domw.gov.in/assets/frontend/img/team/user-login.png"
              alt={"Person and Locker"}
            />
            <h1>Login Details</h1>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
              <TextValidator
                required
                error={this.state.emailError}
                id="email"
                label="Email"
                variant="filled"
                onChange={this.handleEmailChange}
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              <br />
              <br />
              <TextField
                required
                error={this.state.passwordError}
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                onChange={this.handlePasswordChange}
              />
              <br />
              <br />
              <label className={styles.label}>New to us ?</label>
              <a
                onClick={e => {
                  e.preventDefault();
                  this.changeForm(false);
                }}
                className={styles.join_link}
              >
                Join now
              </a>
              <br></br>
              <br></br>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={styles.button}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </ValidatorForm>
          </div>
        </div>
      );
  }
}
