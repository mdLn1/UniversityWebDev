import React, { Component } from "react";
import { Header, Pagination } from "semantic-ui-react";
import Layout from "../../components/Layout";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import MyIdeasList from "../../components/MyIdeasList";
import { handleAuthSSR } from "../../utilsNext/authSSR";

class MyIdeas extends Component {
  state = {
    userID: this.props.userID || "",
    ideas: this.props.ideas || [],
    apiErrors: [],
    selectedPage: 1,
    numberOfPages: this.props.numberOfPages || 1,
    token: this.props.token || ""
  };

  static async getInitialProps(props) {
    await handleAuthSSR(props);
    const { token } = await cookies(props);
    let decoded = await jwt_decode(token);
    let userID = decoded.user.id;
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      let res = await axios.get(
        `api/ideas/user/${userID}?itemsCount=5&pageNo=${1}`,
        config
      );
      let ideas = res.data.userIdeas;
      let totalIdeas = res.data.totalIdeas;
      return {
        token,
        userID,
        ideas,
        numberOfPages: Math.ceil(totalIdeas / 5)
      };
    } catch (err) {
      return { connectionError: "connection failed" };
    }
  }

  async updateListOfIdeas(activePage = 1) {
    try {
      const config = {
        headers: {
          "x-auth-token": this.state.token
        }
      };
      const res = await axios.get(
        `api/ideas/user/${this.state.userID}?itemsCount=5&pageNo=${activePage}`,
        config
      );
      let ideas = res.data.userIdeas;
      let totalIdeas = res.data.totalIdeas;
      this.setState(prevState => ({
        ...prevState,
        ideas,
        numberOfPages: Math.ceil(totalIdeas / 5),
        connectionError: false
      }));
    } catch (err) {
      this.setState({ connectionError: err });
    }
  }

  setPageNum = async (event, { activePage }) => {
    this.setState({ selectedPage: activePage });
    await this.updateListOfIdeas(activePage);
  };

  render() {
    const { selectedPage, numberOfPages } = this.state;
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center">
          My Ideas
        </Header>
        <MyIdeasList ideas={this.state.ideas} />
        <div style={{ margin: "2rem auto", textAlign: "center" }}>
          <Pagination
            activePage={selectedPage}
            totalPages={numberOfPages}
            siblingRange={1}
            onPageChange={this.setPageNum}
          />
        </div>
      </Layout>
    );
  }
}

export default MyIdeas;
