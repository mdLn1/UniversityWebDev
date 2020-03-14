import React, { Component } from "react";
import { Feed, Icon } from "semantic-ui-react";
import { Link } from "../routes";

export default class CommentsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    return (
      <Feed
        events={comments.map((cmt, index) => {
          const date =
            cmt.commentTime.slice(0, 10) +
            " at " +
            cmt.commentTime.slice(11, 16);
          const meta = (
            <div style={{ textDecoration: "underline" }}>
              <Link route="/">
                <a>
                  <Icon name="warning circle"></Icon>Report
                </a>
              </Link>
            </div>
          );
          return {
            key: index,
            image: "https://i.postimg.cc/KYL2zxnD/user.jpg",
            date: date,
            meta: meta,
            summary: cmt.isAnonymous ? "Anonymous" : cmt.name,
            extraText: cmt.comment
          };
        })}
      />
    );
  }
}
