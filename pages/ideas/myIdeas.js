import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import MyIdeasList from "../../components/MyIdeasList";

class MyIdeas extends Component {
  state = {
    userID: "",
    ideas: [],
    apiErrors: []
  };

  static async getInitialProps(props) {
    const { token } = await cookies(props);
    let decoded = await jwt_decode(token);

    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      let res = await axios.get(`api/ideas/user/${decoded.user.id}`, config);
      let ideas = res.data;

      return { token, decoded, ideas };
    } catch (err) {
      return { connectionError: "connection failed" };
    }
  }

  render() {
    console.log(this.props.ideas);
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center">
          My Ideas
        </Header>
        <MyIdeasList ideas={this.props.ideas.userIdeas} />
      </Layout>
    );
  }
}

export default MyIdeas;
