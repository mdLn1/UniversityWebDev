import React, { Component } from "react";
import { Button, Form, Header, Message, Container } from "semantic-ui-react";
import { Cookies } from "react-cookie";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

const cookies = new Cookies();

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    apiErrors: []
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = async e => {
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
        passwordError
      }));
    } else {
      try {
        const res = await axios.post("api/auth/login/", { email, password });
        cookies.set("token", res.data.token);
        alert(
          "Your last login was on the " +
            res.data.user.lastLogin.slice(0, 10) +
            " at " +
            res.data.user.lastLogin.slice(11, 19)
        );
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", res.data.token);
        Router.replace({ pathname: "/", query: { loginSuccess: true } }, "/");
      } catch (err) {
        this.setState({
          apiErrors: err.response.data.errors
        });
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
        content: "Incorrect email address",
        pointing: "below"
      };
    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default LoginForm;
