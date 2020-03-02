import React from "react";
import styles from "./LoginForm.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
    this.changeForm = this.props.changeForm;
    this.onClick = this.onClick.bind(this);
    //this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  onClick(e) {
    console.log(this.state.username);
    console.log(this.state.password);
  }

  handleUserNameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async e => {
    console.log(this.state.username);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const obj = { email: this.state.username, password: this.state.password };
        const res = await axios.post("/api/auth/login/", obj, config);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        this.setState({ loggedIn: true });
    } catch (err) {
      console.log(err);
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
            <TextField
              id="username"
              label="Username"
              variant="filled"
              onChange={this.handleUserNameChange}
              value={this.state.username}
            />
            <br />
            <br />
            <TextField
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
          </div>
        </div>
      );
  }
}
