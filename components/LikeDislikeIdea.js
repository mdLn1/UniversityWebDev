import React, { Component } from "react";
import { Icon, Message } from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class LikeDislikeArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positiveVotes: this.props.positiveVotes,
      negativeVotes: this.props.negativeVotes,
      voted: this.props.voted,
      apiErrors: []
    }
  }

  async ratingHandler(ID, vote) {
    try {
      const res = await axios.get(`/api/ideas/${ID}/rate?vote=${vote}`);
      if (vote === 0) {
        this.setState(prevState => ({
          ...prevState,
          voted: 0,
          negativeVotes: prevState.negativeVotes + 1
        }))
      } else
        if (vote === 1) {
          this.setState(prevState => ({
            ...prevState,
            voted: 1,
            positiveVotes: prevState.positiveVotes + 1
          }))
        }
    } catch (err) {
      if (err.response)
        this.setState({ apiErrors: err.response.data.errors });
      console.log(err);
    }
  }

  render() {
    const { ID, page } = this.props;
    const { positiveVotes, negativeVotes, voted } = this.state;
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
        <p>
          {voted === null &&
            <a onClick={() => this.ratingHandler(ID, 1)}>
              <Icon name="thumbs up outline"></Icon>
            </a>}
          {voted === 0 && <Icon name="thumbs up outline"></Icon>}
          {voted === 1 && <Icon color="teal" name="thumbs up"></Icon>}
          <span>{positiveVotes}</span>
          <span style={{ marginRight: "2rem" }} />
          {voted === null &&
            <a onClick={() => this.ratingHandler(ID, 0)}>
              <Icon name="thumbs down outline"></Icon>
            </a>}
          {voted === 1 && <Icon name="thumbs down outline"></Icon>}
          {voted === 0 && <Icon color="teal" name="thumbs down"></Icon>}
          <span>{negativeVotes}</span>
        </p>
        {
          this.state.apiErrors.length > 0 && (
            <Message negative>
              <Message.Header>
                There were some errors with your submission
            </Message.Header>
              <Message.List items={this.state.apiErrors} />
            </Message>
          )
        }
      </div >
    );
  }
}
