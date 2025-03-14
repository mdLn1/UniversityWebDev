import React, { Component } from "react";
import { Form, Button, Message, Checkbox, Segment } from "semantic-ui-react";
import { Cookies } from "react-cookie";
import axios from "axios";
import CommentsList from "./CommentsList";

export default class CommentsArea extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    comments: this.props.comments,
    comment: "",
    anonComment: false,
    apiErrors: []
  };

  anonCommentCheckboxChangeHandler = e => {
    const value = !this.state.anonComment;
    this.setState({ anonComment: value });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitComment = async e => {
    e.preventDefault();
    try {
      const obj = {
        comment: this.state.comment,
        isAnonymous: this.state.anonComment,
        ideaId: this.props.ID
      };
      const res = await axios.post(
        `/api/ideas/${this.props.ID}/comments/`,
        obj
      );
      const comment = res.data;
      this.setState(prevState => ({
        ...prevState,
        comments: [comment, ...prevState.comments],
        anonComment: false,
        comment: ""
      }));
    } catch (err) {
      if (err.response)
        this.setState({ apiErrors: err.response.data.errors });
    }
  };

  render() {
    return (
      <div>
        <Segment color="teal" textAlign="left">
          {this.props.canSubmit ? (
            <Form onSubmit={this.submitComment} id="form">
              <Form.Input
                name="comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
                required
              >
                <input placeholder="Add Comment" />
              </Form.Input>
              <Form.Field name="anonComment">
                <Checkbox
                  label="Anonymous"
                  checked={this.state.anonComment}
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
          ) : (
              <Message negative>
                <Message.Header>
                  Comments can no longer be submitted
              </Message.Header>
              </Message>
            )}
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
          <CommentsList ideaID={this.props.ID} comments={this.state.comments} />
        </Segment>
      </div>
    );
  }
}
