import React, { Component, Fragment } from "react";
import { Button, Modal, Header, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../routes";
import AttachmentsList from "./AttachmentsList";

export default class AttachmentsModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalOpen: false,
    apiErrors: [],
    uploads: []
  };

  handleOpen = async () => {
    try {
      const cmtsRes = await axios.get(`/api/ideas/${this.props.ID}/uploads`);
      const { uploads } = cmtsRes.data;
      this.setState(prevState => ({
        ...prevState,
        uploads
      }));
    } catch (err) {
      console.log(err);
    }
    this.setState({ modalOpen: true });
  };

  handleClose = () => this.setState({ modalOpen: false });

  routeToIdeaHandler(ID) {
    Router.push(`/ideas/${ID}`);
  }

  async routeToDownloadHandler(ID) {
    try {
      await axios.get(`/api/ideas/${this.props.ID}/uploads/download`);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Modal
        trigger={
          <Button size="tiny" onClick={this.handleOpen}>
            Attachments ({this.props.uploadsCount})
          </Button>
        }
        closeIcon
      >
        <Modal.Header>Attachments</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <AttachmentsList uploads={this.state.uploads} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.state.uploads.length != 0 ? (
            <Button
              color="teal"
              onClick={() => this.routeToDownloadHandler(this.props.ID)}
            >
              <Icon name="download" />
              Download Zip
            </Button>
          ) : null}

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
