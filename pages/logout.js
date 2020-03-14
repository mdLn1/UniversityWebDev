import React, { Component } from "react";
import { Cookies } from "react-cookie";
import { Message } from "semantic-ui-react";
const cookies = new Cookies();
import Layout from "../components/Layout";

export default class logout extends Component {
  componentDidMount() {
    cookies.remove("token");
    if (typeof Storage !== "undefined") localStorage.clear();
  }

  render() {
    return (
      <Layout>
        <Message>
          You are logged out <a href="/">Go to the Home Page</a>
        </Message>
      </Layout>
    );
  }
}
