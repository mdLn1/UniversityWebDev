import React, { Component } from "react";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";

export default class IdeaFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      author,
      posted_time,
      positiveVotes,
      negativeVotes,
      commentsCount,
      uploadsCount
    } = this.props;
    return (
      <div>
        <div style={{ float: "right", textDecoration: "underline" }}>
          <p>
            Posted by: <strong>{author}</strong>
          </p>
          <p>
            Date: <strong>{posted_time.slice(0, 10)}</strong>
          </p>
        </div>
        <div style={{ float: "left", textDecoration: "underline" }}>
          <p>
            <Link href={`/`}>
              <a>
                <Icon name="thumbs up outline"></Icon>
              </a>
            </Link>
            <span>{positiveVotes}</span>
            <span style={{ marginRight: "2rem" }} />
            <Link href={`/`}>
              <a>
                <Icon name="thumbs down outline"></Icon>
              </a>
            </Link>
            <span>{negativeVotes}</span>
          </p>
          <Button size="tiny">Comments ({commentsCount})</Button>
          <Button size="tiny">Attachments ({uploadsCount})</Button>
        </div>
      </div>
    );
  }
}
