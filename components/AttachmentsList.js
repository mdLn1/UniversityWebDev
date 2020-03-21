import React, { Component } from "react";
import { List, Header, Icon, Container } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../routes";

export default class AttachmentsModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { uploads } = this.props;
    if (uploads.length == 0) {
      return (
        <Container fluid>
          <Header icon>
            <Icon name="warning" />
            No Uploads for this idea yet.
          </Header>
        </Container>
      );
    }
    return (
      <div>
        <List divided relaxed>
          {uploads.map((el, index) => {
            return (
              <List.Item key={index}>
                <List.Icon
                  name="external alternate"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>
                    <a
                      download={el.name}
                      target="_blank"
                      href={el.url}
                      style={{ textDecoration: "underline" }}
                    >
                      {el.name}
                    </a>
                  </List.Header>
                  <List.Description>{el.description}</List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}
