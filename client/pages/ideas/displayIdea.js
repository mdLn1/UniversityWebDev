import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card, Icon, Button, Header, Menu, Dropdown } from "semantic-ui-react";
import axios from "axios";

export default class displayIdea extends Component {
  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    try {
      const res = await axios.get("http://localhost:5000/api/ideas/" + ID);
      idea = res.data[0];
      console.log(res.data[0]);
    } catch (err) {
      console.log(err);
    }
    return { ID, idea };
  }
  render() {
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center">
          {this.props.idea.Title}
          <br></br>
          {this.props.idea.author}
        </Header>
      </Layout>
    );
  }
}
