import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Card,
  Icon,
  Button,
  Header,
  Menu,
  Dropdown,
  Message
} from "semantic-ui-react";
import { Link } from "../routes";
import axios from "axios";
import { Pagination } from "semantic-ui-react";

class ElectionIndex extends Component {
  state = {
    selectedPage: "",
    numberOfPages: "",
    listOfIdeas: []
  };
  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    this.setState({ selectedPage: 1 });
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ideas?itemsCount=5&pageNo=${this.state.selectedPage}`
      );
      this.setState({ listOfIdeas: res.data.ideas });
      this.setState({ numberOfPages: Math.ceil(res.data["totalIdeas"] / 5) });
    } catch (err) {
      console.log(err);
    }
  }

  async updateListOfIdeas(activePage) {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ideas?itemsCount=5&pageNo=${activePage}`
      );
      this.setState({ listOfIdeas: res.data.ideas });
      this.setState({ numberOfPages: Math.ceil(res.data["totalIdeas"] / 5) });
    } catch (err) {
      console.log(err);
    }
  }

  renderIdeas() {
    const items = this.state.listOfIdeas.map((idea, index) => {
      const rightStyle = {
        float: "right",
        textDecoration: "underline"
      };

      const leftStyle = {
        float: "left",
        textDecoration: "underline"
      };

      let header = (
        <div>
          <div style={leftStyle}>
            <Link route={`/ideas/${idea.ID}`}>
              <a>
                <h2 style={{ color: "teal" }}>{idea.Title}</h2>
              </a>
            </Link>
          </div>
          <div style={rightStyle}>
            <Button color="red" size="mini">
              Report
            </Button>
          </div>
        </div>
      );

      let extra = (
        <div>
          <div style={rightStyle}>
            <p>
              Posted by: <strong>{idea.author}</strong>
            </p>
            <p>
              Date: <strong>{idea.posted_time.slice(0, 10)}</strong>
            </p>
          </div>
          <div style={leftStyle}>
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
            <Button size="tiny">Comments ({idea.commentsCount})</Button>
            <Button size="tiny">Attachments ({idea.uploadsCount})</Button>
          </div>
        </div>
      );
      return {
        key: index,
        header: header,
        description: idea.description,
        fluid: true,
        extra: extra
      };
    });
    return <Card.Group items={items} />;
  }

  setPageNum = async (event, { activePage }) => {
    this.setState({ selectedPage: activePage });
    await this.updateListOfIdeas(activePage);
  };

  render() {
    const { selectedPage, numberOfPages } = this.state;
    const sortOptions = [
      { key: 1, text: "Date (new to old)", value: 1 },
      { key: 2, text: "Date (old to new", value: 2 },
      { key: 3, text: "Most Liked", value: 3 },
      { keu: 4, text: "Most Viewed", value: 4 }
    ];
    let name = null;
    if (typeof Storage !== "undefined") {
      name = localStorage.getItem("username");
    }

    return (
      <Layout>
        <div>
          <Header as="h2" color="teal" textAlign="center">
            Ideas Portal Dashboard
          </Header>
          <div>
            <Menu compact>
              <Dropdown text="Sort by" options={sortOptions} simple item />
            </Menu>
          </div>
          {this.props.query.registrationSuccess && name && (
            <Message
              success
              header="Registration successful"
              content={"You are now logged in as " + name}
            />
          )}
          {this.props.query.loginSuccess && name && (
            <Message
              success
              header="Login Successful"
              content={"You are now logged in as " + name}
            />
          )}
          <br></br>
          {this.renderIdeas()}
          <br></br>
          <Pagination
            activePage={selectedPage}
            totalPages={numberOfPages}
            siblingRange={1}
            onPageChange={this.setPageNum}
          />
        </div>
      </Layout>
    );
  }
}

export default ElectionIndex;
