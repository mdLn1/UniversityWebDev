import React, { Component } from "react";
import Layout from "../components/Layout";
import { Card, Icon, Button } from "semantic-ui-react";
import { Link } from "../routes";
import axios from "axios";
import { Pagination } from "semantic-ui-react";

class ElectionIndex extends Component {
  state = {
    selectedPage: "",
    numberOfPages: "",
    listOfIdeas: []
  };

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
            <a>
              <h2>{idea.Title}</h2>
            </a>
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
    return (
      <Layout>
        <div>
          <h3>Dashboard Homepage</h3>
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
