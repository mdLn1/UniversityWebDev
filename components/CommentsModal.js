import React, { Component, Fragment } from "react";
import { Button, Modal, Header, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import CommentsList from "./CommentsList";
import Link from "next/link";

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
          <Link  href="/ideas/[id]" as={`/ideas/${this.props.ID}`}>
            <Button
              primary
            >
              Go To Idea <Icon name="right chevron" />
            </Button>
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}
