import React, { Component, Fragment } from "react";
import { Button, Modal, Header, Icon, Form } from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export default class ReportCommentModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalOpen: false,
    problem: "",
    apiErrors: []
  };

  handleOpen = () => {
    const token = cookies.get("token");
    if (token != null) {
      this.setState({ modalOpen: true });
    } else alert("Please login to report an idea.");
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleProblem = e => {
    this.setState({ problem: e.target.value });
  };

  reportIdeaHandler = async () => {
    const token = cookies.get("token");
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const obj = {
        ideaID: this.props.ideaId,
        problem: this.state.problem
      };
      const res = await axios.post(
        `/api/ideas/${this.props.ideaID}/comments/${this.props.commentID}/report`,
        obj,
        config
      );
      alert(res.data.success);
      this.handleClose();
    } catch (err) {
      this.setState({ apiErrors: err.response.data.errors });
    }
  };

  render() {
    return (
      <Modal
        trigger={
          <a onClick={this.handleOpen}>
            <Icon name="warning circle"></Icon>Report
          </a>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="warning circle" content="Report a comment to the admin" />
        <Modal.Content>
          <p>Please type the problem you experienced below</p>
          <Form id="form" onSubmit={this.reportIdeaHandler}>
            <Form.Input name="problem" onChange={this.handleProblem} required>
              <input placeholder="Type problem to report" />
            </Form.Input>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Submit
            </Button>
          </Form>
          {this.state.apiErrors.length > 0 && (
            <Message negative>
              <Message.Header>
                There were some errors with your submission
              </Message.Header>
              <Message.List items={this.state.apiErrors} />
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={this.handleClose}>
            <Icon name="checkmark" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
