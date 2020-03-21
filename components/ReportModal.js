import React, { Component, Fragment } from "react";
import { Button, Modal, Header, Icon, Form, Message } from "semantic-ui-react";
import axios from "axios";
import { AuthContext } from '../context/AuthenticationContext'

export default class ReportModal extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
  }

  state = {
    modalOpen: false,
    problem: "",
    apiErrors: []
  };

  handleOpen = () => {

    if (!this.context.authenticated) alert("Please login to report an idea.");
    else this.setState({ modalOpen: true })
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleProblem = e => {
    this.setState({ problem: e.target.value });
  };

  reportIdeaHandler = async () => {
    try {
      const res = await axios.post(
        `/api/ideas/${this.props.ideaId}/report`,
        { problem: this.state.problem }
      );
      alert(res.data.success);
      this.handleClose();
    } catch (err) {
      if (err.response)
        this.setState({ apiErrors: err.response.data.errors });
    }
  };

  render() {
    return (
      <Modal
        trigger={
          <Button color="red" size="mini" onClick={this.handleOpen}>
            Report
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="warning circle" content="Report an idea to the admin" />
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
