import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { Link } from "../routes";

export default class CommentsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { idea } = this.props;

    let cardHeader = (
      <div>
        <div style={{ float: "left", color: "teal", fontSize: "18px" }}>
          <p>{idea.Title}</p>
        </div>
        <div style={{ float: "right" }}>
          <Button color="red" size="mini">
            Report
          </Button>
        </div>
      </div>
    );

    let cardDescription = (
      <div>
        <div style={{ float: "left", color: "black", fontSize: "16px" }}>
          <p>{idea.description}</p>
        </div>
      </div>
    );

    let cardExtra = (
      <div>
        <div style={{ float: "right", fontSize: "12px", textAlign: "left" }}>
          <p>Category: {idea.category}</p>
          <p>Total views: {idea.views}</p>
          <p>
            Posted by:
            {idea.isAnonymous ? " Anonymous" : idea.author}
          </p>
          <p>Date: {idea.posted_time.slice(0, 10)}</p>
        </div>
        <div style={{ float: "left", fontSize: "14px", textAlign: "left" }}>
          <p>
            <Link route={`/`}>
              <a>
                <Icon name="thumbs up outline"></Icon>
              </a>
            </Link>
            <span>{idea.positiveVotes}</span>
            <span style={{ marginRight: "2rem" }} />
            <Link route={`/`}>
              <a>
                <Icon name="thumbs down outline"></Icon>
              </a>
            </Link>
            <span>{idea.negativeVotes}</span>
          </p>
          <Button size="tiny">Attachments ({idea.uploadsCount})</Button>
        </div>
      </div>
    );

    return (
      <Card fluid>
        <Card.Content header={cardHeader} />
        <Card.Content description={cardDescription} />
        <Card.Content extra>{cardExtra}</Card.Content>
      </Card>
    );
  }
}
