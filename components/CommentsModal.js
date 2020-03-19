import React, { Component, Fragment } from "react";
import { Button, Modal, Header, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import CommentsList from "./CommentsList";
import { Router } from "../routes";

export default class CommentsModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalOpen: false,
    apiErrors: [],
    data: []
  };

  handleOpen = async () => {
    try {
      const cmtsRes = await axios.get(`/api/ideas/${this.props.ID}/comments`);
      const { data } = cmtsRes;
      this.setState(prevState => ({
        ...prevState,
        data
      }));
      console.log(this.state.data);
    } catch (err) {
      console.log(err);
    }
    this.setState({ modalOpen: true });
  };
  handleClose = () => this.setState({ modalOpen: false });

  routeToIdeaHandler(ID) {
    Router.push(`/ideas/${ID}`);
  }

  render() {
    return (
      <Modal
        trigger={
          <Button size="tiny" onClick={this.handleOpen}>
            Comments ({this.props.commentsCount})
          </Button>
        }
        closeIcon
      >
        <Modal.Header>Comments</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <CommentsList ideaID={this.props.ID} comments={this.state.data} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() => this.routeToIdeaHandler(this.props.ID)}
          >
            Go To Idea <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
