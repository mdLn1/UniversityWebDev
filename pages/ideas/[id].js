import React, { Component } from "react";
import Layout from "../../components/Layout";
import {
  Icon,
  Button,
  Header,
  Segment,
  Form,
  Checkbox
} from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
import CommentsList from "../../components/CommentsList";
import IdeaDisplay from "../../components/IdeaDisplay";

const cookies = new Cookies();

export default class displayIdea extends Component {
  state = {
    comment: "",
    anonComment: false
  };

  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    let comments;
    try {
      const res = await axios.get("/api/ideas/" + ID);
      idea = res.data[0];
      const cmtsRes = await axios.get(`/api/ideas/${ID}/comments`);
      comments = cmtsRes.data;
    } catch (err) {
      console.log(err);
    }
    return { ID, idea, comments };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  anonCommentCheckboxChangeHandler = e => {
    const value = !this.state.anonComment;
    this.setState({ anonComment: value });
    console.log(value);
  };

  submitComment = async e => {
    e.preventDefault();
    const form = document.forms[0];
    try {
      console.log(this.state.comment);
      console.log(this.state.anonComment);
      const config = {
        headers: {
          "x-auth-token": cookies.get("token")
        }
      };

      const obj = {
        comment: this.state.comment,
        isAnonymous: this.state.anonComment,
        ideaId: this.props.ID
      };

      const res = await axios.post(
        `/api/ideas/${this.props.ID}/comments/`,
        obj,
        config
      );
      window.location.reload();
    } catch (err) {
      //this.setState({ apiErrors: err.response.data.errors });
      console.log(err);
    }
  };

  render() {
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center"></Header>
        <IdeaDisplay idea={this.props.idea} />
        <Segment color="teal" textAlign="left">
          <Form onSubmit={this.submitComment} id="form">
            <Form.Input name="comment" onChange={this.handleInputChange}>
              <input placeholder="Add Comment" />
            </Form.Input>
            <Form.Field name="anonComment">
              <Checkbox
                label="Anonymous"
                onClick={this.anonCommentCheckboxChangeHandler}
              />
            </Form.Field>
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Segment>
        <Segment placeholder>
          <CommentsList comments={this.props.comments} />
        </Segment>
      </Layout>
    );
  }
}
