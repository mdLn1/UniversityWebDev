import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import Layout from "../components/Layout";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";

class Stats extends Component {
  state = {};

  static async getInitialProps(props) {
    try {
    } catch (err) {}
    return {};
  }

  render() {
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center">
          Portal Statistics
        </Header>
        <p>Test</p>
      </Layout>
    );
  }
}

export default Stats;
