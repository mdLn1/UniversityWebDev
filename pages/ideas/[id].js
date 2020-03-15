import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Header, Segment } from "semantic-ui-react";
import axios from "axios";
import IdeaDisplay from "../../components/IdeaDisplay";
import CommentsArea from "../../components/CommentsArea";

export default class displayIdea extends Component {
  state = {
    comments: this.props.comments || []
  };

  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    let comments;
    try {
      const res = await axios.get("/api/ideas/" + ID);
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
    console.log(this.props.idea);
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
