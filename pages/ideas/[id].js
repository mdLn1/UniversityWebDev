import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import axios from "axios";
import IdeaDisplay from "../../components/IdeaDisplay";
import CommentsArea from "../../components/CommentsArea";
import cookies from "next-cookies";

export default class displayIdea extends Component {
  state = {
    comments: this.props.comments || []
  };

  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    let comments;
    const { token } = cookies(props);
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.get(`/api/ideas/${ID}`, config);
      idea = res.data[0];
      const cmtsRes = await axios.get(`/api/ideas/${ID}/comments`);
      await axios.get(`/api/ideas/${ID}/increase-views`);
      comments = cmtsRes.data;
    } catch (err) {
      console.log(err);
    }
    return { ID, idea, comments };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center"></Header>
        <IdeaDisplay idea={this.props.idea} />
        <CommentsArea
          ID={this.props.ID}
          comments={this.props.comments}
        ></CommentsArea>
      </Layout>
    );
  }
}
