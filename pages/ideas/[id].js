import React, { Component } from "react";
import Layout from "../../components/Layout";
import {
  Icon,
  Button,
  Header,
  Segment,
  Form,
  Checkbox,
  Message
} from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
import CommentsList from "../../components/CommentsList";
import IdeaDisplay from "../../components/IdeaDisplay";

const cookies = new Cookies();

export default class displayIdea extends Component {
  state = {
    comment: "",
    anonComment: false,
    apiErrors: []
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
      console.log(cmtsRes.data);
      console.log(res.data[0]);
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
  };

  submitComment = async e => {
    e.preventDefault();
    const form = document.forms[0];
    try {
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
      this.setState({ apiErrors: err.response.data.errors });
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
            <Form.Input
              name="comment"
              onChange={this.handleInputChange}
              required
            >
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
          {this.state.apiErrors.length > 0 && (
            <Message negative>
              <Message.Header>
                There were some errors with your submission
              </Message.Header>
              <Message.List items={this.state.apiErrors} />
            </Message>
          )}
        </Segment>
        <Segment placeholder>
          <CommentsList comments={this.props.comments} />
        </Segment>
      </Layout>
    );
  }
}
