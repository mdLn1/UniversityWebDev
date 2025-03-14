import React, { Component } from "react";
import { Feed, Icon, Header } from "semantic-ui-react";
import { Link } from "../routes";
import ReportCommentModal from "../components/ReportCommentModal";
export default class CommentsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ideaID, comments } = this.props;
    if (comments.length == 0) {
      return (
        <Header icon>
          <Icon name="comment" />
          No comments for this idea yet.
        </Header>
      );
    }
    return (
      <Feed
        events={comments.map((cmt, index) => {
          const date =
            cmt.commentTime.slice(0, 10) +
            " at " +
            cmt.commentTime.slice(11, 16);
          const meta = (
            <div style={{ textDecoration: "underline" }}>
              <ReportCommentModal ideaID={ideaID} commentID={cmt.ID} />
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
