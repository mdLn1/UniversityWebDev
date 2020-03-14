import React, { Component, Fragment } from "react";
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
      uploadsCount,
      category,
      views,
      isAnonymous,
      showComments,
      ideasListStyle
    } = this.props;
    let style1, style2;

    if (ideasListStyle) {
      style1 = { float: "right", textDecoration: "underline" };
      style2 = { float: "left", textDecoration: "underline" };
    } else {
      style1 = { float: "right", fontSize: "12px", textAlign: "left" };
      style2 = { float: "left", fontSize: "14px", textAlign: "left" };
    }
    return (
      <div>
        <div style={style1}>
          {!ideasListStyle && (
            <Fragment>
              <p>Category: {category}</p>
              <p>Total views: {views}</p>
            </Fragment>
          )}
          <p>
            Posted by:
            {isAnonymous ? " Anonymous" : author}
          </p>
          <p>
            Date: <strong>{posted_time.slice(0, 10)}</strong>
          </p>
        </div>
        <div style={style2}>
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
          {showComments && (
            <Button size="tiny">Comments ({commentsCount})</Button>
          )}
          <Button size="tiny">Attachments ({uploadsCount})</Button>
        </div>
      </div>
    );
  }
}
