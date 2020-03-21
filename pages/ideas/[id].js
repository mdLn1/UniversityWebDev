import React, { Component, Fragment } from "react";
import { Header, Message } from "semantic-ui-react";
import axios from "axios";
import IdeaDisplay from "../../components/IdeaDisplay";
import CommentsArea from "../../components/CommentsArea";
import cookies from "next-cookies";

export default class displayIdea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments || [],
      isCommentSubmissionAllowed: false
    };
  }

  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    let comments, deadlines;

    const { token } = cookies(props);
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      let res = await axios.get(`/api/ideas/${ID}`, config);
      idea = res.data[0];
      const cmtsRes = await axios.get(`/api/ideas/${ID}/comments`);
      comments = cmtsRes.data;
      res = await axios.get("/api/management/deadlines");
      const { deadlines } = res.data;
      await axios.get(`/api/ideas/${ID}/increase-views`);
      return { ID, idea, comments, deadlines };
    } catch (err) {
      return { connectionError: "connection failed" };
    }
  }

  componentDidMount() {
    const { deadlines } = this.props;
    if (deadlines && deadlines.length > 0) {
      const currDeadline = deadlines.find(
        x => new Date(x.CommentsSubmissionEnd) > new Date()
      );
      if (currDeadline) {
        this.setState({
          currentDeadline: currDeadline,
          isCommentSubmissionAllowed: true
        });
      }
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { connectionError } = this.props;
    if (connectionError)
      return (
        <Fragment>
          <Message negative>
            <Message.Header>
              Sorry the connection to the server was interrupted
            </Message.Header>
            <p>{connectionError}</p>
          </Message>
        </Fragment>
      );
    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center"></Header>
        <IdeaDisplay idea={this.props.idea} />
        <CommentsArea
          ID={this.props.ID}
          comments={this.props.comments}
          canSubmit={this.state.isCommentSubmissionAllowed}
        ></CommentsArea>
      </Fragment>
    );
  }
}
