import React, { Component, Fragment } from "react";
import { Button, Form, Header, Message, Container } from "semantic-ui-react";
import { Cookies } from "react-cookie";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
const { detect } = require("detect-browser");
import { AuthContext } from "../context/AuthenticationContext";
const localBrowser = detect();

const cookies = new Cookies();

class LoginForm extends Component {
  static contextType = AuthContext;
  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    apiErrors: [],
    loading: true
  };

  componentDidMount() {
    if (this.context.authenticated) {
      this.setState({ loading: false })

      history.back();

    } else {
      this.setState({ loading: false })

    }

  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = async e => {
    this.setState({ loading: true })
    e.preventDefault();
    const { email, password } = this.state;
    const emailError = !(
      email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk")
    );
    const passwordError = password.length < 5;
    if (emailError || passwordError) {
      this.setState(prevState => ({
        ...prevState,
        emailError,
        passwordError,
        loading: false
      }));
    } else {
      try {
        const res = await axios.post("/api/auth/login/", { email, password });
        cookies.set("token", res.data.token);
        axios.defaults.headers.common["x-auth-token"] = res.data.token;
        await axios.post("/api/user/update-last-login");
        if (res.data.user.lastLogin != null) {
          alert(
            "Your last login was on the " +
            res.data.user.lastLogin.slice(0, 10) +
            " at " +
            res.data.user.lastLogin.slice(11, 19)
          );
        } else {
          alert("Welcome! This is your first login!");
        }
        if (localBrowser) {
          let browser = localBrowser.name;
          let os = localBrowser.os;
          await axios.post("/api/userDevice/", { browser, os });
        }
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", res.data.token);

        this.context.loginUser(res.data.user, res.data.token);
        Router.replace({ pathname: "/", query: { loginSuccess: true } }, "/");
      } catch (err) {
        if (err.response)
          this.setState({
            apiErrors: err.response.data.errors
          });
        this.setState({ loading: false })
      }
    }
  };

  render() {
    const { passwordError, emailError, apiErrors } = this.state;
    const passwordInputProps = {
      label: "Password",
      name: "password",
      icon: "lock",
      iconPosition: "left",
      placeholder: "Your password",
      type: "password",
      onChange: this.handleInputChange,
      required: true
    };
    if (passwordError)
      passwordInputProps.error = {
        content: "Incorrect password",
        pointing: "below"
      };

    const emailInputProps = {
      label: "Email",
      name: "email",
      icon: "address card",
      iconPosition: "left",
      placeholder: "email@gre.ac.uk or email@greenwich.ac.uk",
      type: "email",
      onChange: this.handleInputChange,
      required: true
    };
    if (emailError)
      emailInputProps.error = {
        content: "Incorrect email address format",
        pointing: "below"
      };
    return (
      <Fragment>
        <div
          style={{ maxWidth: "32rem", margin: "auto", padding: "5rem 2rem" }}
        >
          <Form
            name="loginForm"
            style={{
              border: "1px solid black",
              padding: "1.5rem",
              borderRadius: "1rem"
            }}
            loading={this.state.loading}
            onSubmit={this.loginHandler}
          >
            <Header as="h2" color="teal" textAlign="center">
              Account login
            </Header>
            {apiErrors.length > 0 && (
              <Message negative>
                <Message.Header>
                  There were some errors with your submission
                </Message.Header>
                <Message.List items={apiErrors} />
              </Message>
            )}
            <Form.Input fluid {...emailInputProps} />
            <Form.Input fluid {...passwordInputProps} />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Form>
          <Message>
            New to us?{" "}
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </Message>
        </div>
      </Fragment>
    );
  }
}

export default LoginForm;
