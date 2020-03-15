import React, { Component } from "react";
import { Button, Form, Header, Message, Container } from "semantic-ui-react";
import { Cookies } from "react-cookie";
import Layout from "../../components/Layout";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";

const cookies = new Cookies();

class MyIdeas extends Component {
  state = {
    apiErrors: []
  };

  render() {
    return (
      <Layout>
        <h2>My Ideas</h2>
      </Layout>
    );
  }
}

export default MyIdeas;
