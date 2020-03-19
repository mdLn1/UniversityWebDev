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
    uploads: [],
    downloadAll: ""
  };

  handleOpen = async () => {
    try {
      const cmtsRes = await axios.get(`/api/ideas/${this.props.ID}/uploads`);
      const { uploads } = cmtsRes.data;
      const res = await axios.get(
        `/api/ideas/${this.props.ID}/uploads/download`
      );
      const downloadAll = res.data;
      this.setState(prevState => ({
        ...prevState,
        uploads,
        downloadAll
      }));
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
              <a
                download="idea"
                target="_blank"
                href={this.state.downloadAll}
                style={{ color: "white" }}
              >
                Download Zip
              </a>
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
