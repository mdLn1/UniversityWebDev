import React, { Component } from "react";
import { Icon, Message } from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
import Link from "next/link";

const cookies = new Cookies();

export default class LikeDislikeArea extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    apiErrors: []
  };

  async ratingHandler(ID, vote) {
    console.log(this.props.token);
    try {
      const config = {
        headers: {
          "x-auth-token": cookies.get("token")
        }
      };
      const res = await axios.get(`api/ideas/${ID}/rate?vote=${vote}`, config);
      console.log(res.data);
      if (vote === 0) {
        alert("You have rated the idea negatively");
        window.location.reload();
      }
      if (vote === 1) {
        alert("You have rated the idea positively");
        window.location.reload();
      }
    } catch (err) {
      this.setState({ apiErrors: err.response.data.errors });
      console.log(err);
    }
  }

  render() {
    const { ID, page, positiveVotes, negativeVotes, voted } = this.props;

    const noVote = (
      <p>
        <a onClick={() => this.ratingHandler(ID, 1)}>
          <Icon name="thumbs up outline"></Icon>
        </a>
        <span>{positiveVotes}</span>
        <span style={{ marginRight: "2rem" }} />
        <a onClick={() => this.ratingHandler(ID, 0)}>
          <Icon name="thumbs down outline"></Icon>
        </a>
        <span>{negativeVotes}</span>
      </p>
    );

    const posVote = (
      <p>
        <Icon name="thumbs up" color="teal"></Icon>
        <span>{positiveVotes}</span>
        <span style={{ marginRight: "2rem" }} />
        <a onClick={() => this.ratingHandler(ID, 0)}>
          <Icon name="thumbs down outline"></Icon>
        </a>
        <span>{negativeVotes}</span>
      </p>
    );

    const negVote = (
      <p>
        <a onClick={() => this.ratingHandler(ID, 1)}>
          <Icon name="thumbs up outline"></Icon>
        </a>
        <span>{positiveVotes}</span>
        <span style={{ marginRight: "2rem" }} />
        <Icon name="thumbs down" color="teal"></Icon>
        <span>{negativeVotes}</span>
      </p>
    );

    if (page === "index") {
      return (
        <div>
          <p>
            <Icon name="thumbs up outline"></Icon>
            <span>{positiveVotes}</span>
            <span style={{ marginRight: "2rem" }} />
            <Icon name="thumbs down outline"></Icon>
            <span>{negativeVotes}</span>
          </p>
        </div>
      );
    }
    return (
      <div>
        {voted == null ? noVote : voted === 0 ? negVote : posVote}
        {this.state.apiErrors.length > 0 && (
          <Message negative>
            <Message.Header>
              There were some errors with your submission
            </Message.Header>
            <Message.List items={this.state.apiErrors} />
          </Message>
        )}
      </div>
    );
  }
}
