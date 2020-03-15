import React, { Component, Fragment } from "react";
import Link from "next/link";
import { Button, Modal, Header, Icon, Form } from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export default class IdeaHeader extends Component {
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
    } else alert("please login");
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
        `/api/ideas/${this.props.ideaId}/report`,
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
    const { ideaId, ideaTitle, ideasListStyle } = this.props;

    return (
      <Fragment>
        {!ideasListStyle ? (
          <div style={{ float: "left", color: "teal", fontSize: "18px" }}>
            <p>{ideaTitle}</p>
          </div>
        ) : (
          <div style={{ float: "left", textDecoration: "underline" }}>
            <Link href="/ideas/[id]" as={`/ideas/${ideaId}`}>
              <a>
                <h2 style={{ color: "teal" }}>{ideaTitle}</h2>
              </a>
            </Link>
          </div>
        )}
        <div style={{ float: "right" }}>
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
            <Header
              icon="warning circle"
              content="Report an idea to the admin"
            />
            <Modal.Content>
              <p>Please type the problem you experienced below</p>
              <Form id="form" onSubmit={this.reportIdeaHandler}>
                <Form.Input
                  name="problem"
                  onChange={this.handleProblem}
                  required
                >
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
        </div>
      </Fragment>
    );
  }
}
