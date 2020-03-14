import React, { Component } from "react";
import Layout from "../../components/Layout";
import {
  Feed,
  Icon,
  Button,
  Header,
  Card,
  Segment,
  Form,
  Checkbox
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "../../routes";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default class displayIdea extends Component {
  state = {
    comment: "",
    anonComment: false
  };

  static async getInitialProps(props) {
    const ID = props.query.id;
    let idea;
    let comments;
    try {
      const res = await axios.get("http://localhost:5000/api/ideas/" + ID);
      idea = res.data[0];
      const cmtsRes = await axios.get(
        `http://localhost:5000/api/ideas/${ID}/comments`
      );
      comments = cmtsRes.data;
      console.log(cmtsRes.data);
      console.log(res.data[0]);
    } catch (err) {
      console.log(err);
    }
    return { ID, idea, comments };
  }

  renderComments() {
    const comments = this.props.comments.map((cmt, index) => {
      const date =
        cmt.commentTime.slice(0, 10) + " at " + cmt.commentTime.slice(11, 16);
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
    });
    return <Feed events={comments} />;
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  anonCommentCheckboxChangeHandler = e => {
    const value = !this.state.anonComment;
    this.setState({ anonComment: value });
    console.log(value);
  };

  submitComment = async e => {
    e.preventDefault();
    const form = document.forms[0];
    try {
      console.log(this.state.comment);
      console.log(this.state.anonComment);
      const config = {
        headers: {
          "x-auth-token": cookies.get("token")
        }
      };

      const obj = {
        comment: this.state.comment,
        isAnonymous: this.state.anonComment,
        ideaId: this.props.ID
      };

      const res = await axios.post(
        `/api/ideas/${this.props.ID}/comments/`,
        obj,
        config
      );
      this.renderComments();
    } catch (err) {
      //this.setState({ apiErrors: err.response.data.errors });
      console.log(err);
    }
  };

  render() {
    let idea = this.props.idea;

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
      <Layout>
        <Header as="h2" color="teal" textAlign="center"></Header>
        <Card fluid>
          <Card.Content header={cardHeader} />
          <Card.Content description={cardDescription} />
          <Card.Content extra>{cardExtra}</Card.Content>
        </Card>
        <Segment color="teal" textAlign="left">
          <Form onSubmit={this.submitComment} id="form">
            <Form.Input name="comment" onChange={this.handleInputChange}>
              <input placeholder="Add Comment" />
            </Form.Input>
            <Form.Field name="anonComment">
              <Checkbox
                label="Anonymous"
                onClick={this.anonCommentCheckboxChangeHandler}
              />
            </Form.Field>
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Segment>
        <Segment placeholder>{this.renderComments()}</Segment>
      </Layout>
    );
  }
}
