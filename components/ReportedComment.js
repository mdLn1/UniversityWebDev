import React, { Component, Fragment } from "react";
import { Card, Button, Icon, Segment, Message } from "semantic-ui-react";
import Link from "next/link";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookies = new Cookies();

export default class ReportedComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRevealed: false,
      reportedProblems: [],
      apiErrors: [],
      failedDelete: false
    };
  }
  onDeleteComment = async () => {
    this.setState({ failedDelete: false });
    const result = await this.props.deleteComment(
      this.props.passedComment.comment_id
    );
    if (!result) {
      this.setState({ failedDelete: true });
    }
  };
  onReveal = async () => {
    if (this.state.reportedProblems.length === 0) {
      try {
        axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
        const res = await axios.get(
          "/api/management/reported-comments/" +
            this.props.passedComment.comment_id
        );
        const { reportedProblems } = res.data;
        this.setState({ reportedProblems: reportedProblems });
      } catch (err) {
        if (err.response) {
          this.setState({ apiErrors: err.response.data.errors });
        }
      }
    }
    this.setState(prevState => ({
      isRevealed: !prevState.isRevealed
    }));
  };
  render() {
    const { passedComment } = this.props;
    const {
      idea_id,
      comment_id,
      comment,
      name,
      email,
      commentTime,
      reports
    } = passedComment;
    const {
      isRevealed,
      reportedProblems,
      failedDelete,
      apiErrors
    } = this.state;
    let cardHeader = (
      <Fragment>
        {failedDelete && (
          <Message negative>
            <Message.Header>Comment has not been deleted</Message.Header>
            <p>Please try again</p>
          </Message>
        )}
        <div style={{ float: "left" }}>
          <Link href="/ideas/[id]" as={`/ideas/${idea_id}`}>
            <a style={{ color: "teal" }}>
              <h2 style={{ textDecoration: "underline" }}>
                Visit comment idea
              </h2>
            </a>
          </Link>
        </div>
        <div style={{ float: "right" }}>
          <Button color="red" size="mini" onClick={this.onDeleteComment}>
            Delete comment
          </Button>
        </div>
      </Fragment>
    );

    let cardDescription = (
      <div style={{ position: "relative" }}>
        <div style={{ color: "black", fontSize: "1rem" }}>
          <p>{comment}</p>
        </div>
      </div>
    );
    const style1 = {
      position: "absolute",
      right: ".5rem",
      top: "0",
      fontSize: ".8rem",
      textAlign: "left"
    };
    const style2 = { fontSize: "1rem", textAlign: "left" };

    let cardExtra = (
      <div>
        <div style={{ position: "relative", padding: "1rem .5rem" }}>
          <div style={style1}>
            <p> Author Name: {name} </p>
            <p>
              {" "}
              Author Email: <span>{email}</span>
            </p>
            <p>
              Date: <strong>{new Date(commentTime).toUTCString()}</strong>
            </p>
          </div>
          <div style={{ cursor: "pointer", ...style2 }}>
            {!isRevealed && (
              <Icon
                name="chevron right"
                size="big"
                onClick={this.onReveal}
              ></Icon>
            )}
            {isRevealed && (
              <Icon
                name="chevron down"
                size="big"
                onClick={this.onReveal}
              ></Icon>
            )}
            <span>{reports} Reports</span>
          </div>
        </div>
        {isRevealed && (
          <div style={{ textAlign: "left" }}>
            {apiErrors.length > 0 ? (
              <Message
                error
                header="Oops! There were some problems"
                list={apiErrors}
              />
            ) : (
              <Segment.Group>
                {reportedProblems.map((el, index) => (
                  <Segment color="red" key={index}>
                    <div>
                      <p>
                        <span style={{ fontSize: ".8rem" }}>
                          User reporting:{" "}
                        </span>
                        {el.name}
                      </p>
                      <p>
                        <span style={{ fontSize: ".8rem" }}>Complaint: </span>
                        {el.problem}
                      </p>
                    </div>
                  </Segment>
                ))}
              </Segment.Group>
            )}
          </div>
        )}
      </div>
    );
    return (
      <Card fluid>
        <Card.Content header={cardHeader} />
        <Card.Content description={cardDescription} />
        <Card.Content extra style={{ backgroundColor: "#EFECE5" }}>
          {cardExtra}
        </Card.Content>
      </Card>
    );
  }
}
