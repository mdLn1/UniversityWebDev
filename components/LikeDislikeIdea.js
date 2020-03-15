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
    ID: this.props.ID,
    positiveVotes: this.props.positiveVotes,
    negativeVotes: this.props.negativeVotes,
    apiErrors: []
  };

  async ratingHandler(vote) {
    try {
      const config = {
        headers: {
          "x-auth-token": cookies.get("token")
        }
      };
      const res = await axios.get(
        `api/ideas/${this.state.ID}/rate?vote=${vote}`,
        config
      );
      console.log(res.data);
      if (vote === 0) {
        alert("You have rated the idea negatively");
      }
      if (vote === 1) {
        alert("You have rated the idea positively");
      }
    } catch (err) {
      this.setState({ apiErrors: err.response.data.errors });
      console.log(err);
    }
  }

  render() {
    const { page } = this.props;
    if (page == "index") {
      return (
        <div>
          <p>
            <Icon name="thumbs up outline"></Icon>
            <span>{this.state.positiveVotes}</span>
            <span style={{ marginRight: "2rem" }} />
            <Icon name="thumbs down outline"></Icon>
            <span>{this.state.negativeVotes}</span>
          </p>
          {this.state.apiErrors.length > 0 && (
            <div>
              <Message negative>
                <Message.Header>Please Login to vote</Message.Header>
              </Message>
              <br />
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <p>
          <a onClick={() => this.ratingHandler(1)}>
            <Icon name="thumbs up outline"></Icon>
          </a>
          <span>{this.state.positiveVotes}</span>
          <span style={{ marginRight: "2rem" }} />
          <a onClick={() => this.ratingHandler(0)}>
            <Icon name="thumbs down outline"></Icon>
          </a>
          <span>{this.state.negativeVotes}</span>
        </p>
        {this.state.apiErrors.length > 0 && (
          <div>
            <Message negative>
              <Message.Header>Please Login to vote</Message.Header>
            </Message>
            <br />
          </div>
        )}
      </div>
    );
  }
}
