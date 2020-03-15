import React, { Component, Fragment } from "react";
import { Button } from "semantic-ui-react";
import LikeDislikeArea from "./LikeDislikeIdea";

export default class IdeaFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      ID,
      positiveVotes,
      negativeVotes,
      author,
      posted_time,
      commentsCount,
      uploadsCount,
      category,
      views,
      isAnonymous,
      showComments,
      ideasListStyle,
      page,
      voted
    } = this.props;

    let style1, style2;
    if (ideasListStyle) {
      style1 = { float: "right", textDecoration: "underline" };
      style2 = { float: "left" };
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
          <LikeDislikeArea
            ID={ID}
            positiveVotes={positiveVotes}
            negativeVotes={negativeVotes}
            page={page}
            voted={voted}
          />
          {showComments && (
            <Button size="tiny">Comments ({commentsCount})</Button>
          )}
          <Button size="tiny">Attachments ({uploadsCount})</Button>
        </div>
      </div>
    );
  }
}
