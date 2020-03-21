import React, { Component, Fragment } from "react";
import {
  Card,
  Button,
  Icon,
  Segment,
  Checkbox,
  Message
} from "semantic-ui-react";
import Link from "next/link";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookies = new Cookies();

export default class ReportedIdea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRevealed: false,
      reportedProblems: [],
      apiErrors: [],
      isReadMore: false,
      failedBlockUser: false,
      failedHideUserActivity: false
    };
  }
  onReadMore = () => {
    this.setState({ isReadMore: true });
  };
  onReveal = async () => {
    if (this.state.reportedProblems.length === 0) {
      try {
        axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
        const res = await axios.get(
          "/api/management/reported-ideas/" + this.props.idea.ideaId
        );
        console.log(this.props.idea)
        const { reportedProblems } = res.data;
        this.setState({ reportedProblems });
      } catch (err) {
        if (err.response.data) {
          this.setState({ apiErrors: err.response.data.errors });
        }
      }
    }
    this.setState(prevState => ({
      isRevealed: !prevState.isRevealed
    }));
  };

  onBlockUser = async () => {
    this.setState({ failedBlockUser: false });
    const res = await this.props.blockUserAction(
      this.props.idea.authorId,
      this.props.idea.disabled
    );
    if (!res) {
      this.setState({ failedBlockUser: true });
    }
  };

  onHideUserActivity = async () => {
    this.setState({ failedHideUserActivity: false });
    const res = await this.props.hideUserActivityAction(
      this.props.idea.authorId,
      this.props.idea.hideActivities
    );
    if (!res) {
      this.setState({ failedHideUserActivity: true });
    }
  };
  render() {
    const { idea } = this.props;
    const {
      ideaId,
      name,
      email,
      posted_time,
      Title,
      description,
      reports
    } = idea;
    const {
      isRevealed,
      reportedProblems,
      apiErrors,
      isReadMore,
      failedBlockUser,
      failedHideUserActivity
    } = this.state;
    let cardHeader = (
      <Fragment>
        {failedBlockUser && (
          <Message negative>
            <Message.Header>User has not beed disabled</Message.Header>
            <p>Please try again</p>
          </Message>
        )}
        {failedHideUserActivity && (
          <Message negative>
            <Message.Header>
              User activities have not been hidden
            </Message.Header>
            <p>Please try again</p>
          </Message>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem"
          }}
        >
          <Link href="/ideas/[id]" as={`/ideas/${ideaId}`}>
            <a style={{ color: "teal" }}>
              <h2 style={{ textDecoration: "underline" }}>{Title}</h2>
            </a>
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.idea.hideActivities === 0 || this.props.idea.hideActivities === false ? (
            <Button
              content="Hide Author Activity"
              color="red"
              onClick={this.onHideUserActivity}
              style={{ margin: "0 .5rem" }}
            />
          ) : (
              <Button
                content="Show Author Activity"
                color="green"
                onClick={this.onHideUserActivity}
                style={{ margin: "0 .5rem" }}
              />
            )}
          {this.props.idea.disabled === 1 || this.props.idea.disabled === true ? (
            <Button
              content="Disable Author Account"
              color="red"
              onClick={this.onBlockUser}
              style={{ margin: "0 .5rem" }}
            />
          ) : (
              <Button
                content="Enable Author Account"
                color="green"
                onClick={this.onBlockUser}
                style={{ margin: "0 .5rem" }}
              />
            )}
        </div>
      </Fragment>
    );

    let cardDescription = (
      <div style={{ position: "relative" }}>
        <div style={{ color: "black", fontSize: "1rem" }}>
          {description.length > 100 && !isReadMore ? (
            <p>
              {description.slice(0, 100) + "..."}{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={this.onReadMore}
              >
                Read more
              </span>
            </p>
          ) : (
              <p>{description}</p>
            )}
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
              Date: <strong>{new Date(posted_time).toUTCString()}</strong>
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
