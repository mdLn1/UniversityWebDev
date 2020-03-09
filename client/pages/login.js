import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Router } from "../routes";
import Layout from "../components/Layout";

const cookies = new Cookies();

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  loginHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const obj = { email: this.state.email, password: this.state.password };
      const res = await axios.post(
        "http://localhost:5000/api/auth/login/",
        obj,
        config
      );
      cookies.set("token", res.data.token);
      console.log("token:" + res.data.token);
      alert(
        "Your last login was on the " +
          res.data.user.lastLogin.slice(0, 10) +
          " at " +
          res.data.user.lastLogin.slice(11, 19)
      );
      Router.pushRoute("/");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Layout>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="top"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.loginHandler}>
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
                <Form.Input
                  required
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />
                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default LoginForm;
