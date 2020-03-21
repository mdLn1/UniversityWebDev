import React, { Component, Fragment } from "react";
import { Header, Pagination } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import MyIdeasList from "../../components/MyIdeasList";
import NotAuthenticated from "../../components/NotAuthenticated";
import { AuthContext } from "../../context/AuthenticationContext";

class MyIdeas extends Component {
  state = {
    ideas: [],
    apiErrors: [],
    selectedPage: 1,
    numberOfPages: 1
  };

  async componentDidMount() {
    if (!this.context.authenticated) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/ideas/user/${this.context.user.id}`
        );
        const { userIdeas, totalIdeas } = res.data;
        console.log(res.data)
        this.setState({ ideas: userIdeas, totalPages: Math.ceil(totalIdeas / 5), selectedPage: 1 })
      } catch (err) {
        if (err.response)
          console.log(err.response.data)
      }

    }
  }

  async updateListOfIdeas(activePage = 1) {
    try {
      const res = await axios.get(
        `/api/ideas/user/${this.context.user.id}?itemsCount=5&pageNo=${activePage}`,
      );
      let ideas = res.data.userIdeas;
      let totalIdeas = res.data.totalIdeas;
      this.setState(prevState => ({
        ...prevState,
        ideas,
        numberOfPages: Math.ceil(totalIdeas / 5),
        connectionError: false
      }));
    } catch (err) {
      this.setState({ connectionError: err });
    }
  }

  setPageNum = async (event, { activePage }) => {
    this.setState({ selectedPage: activePage });
    await this.updateListOfIdeas(activePage);
  };

  render() {
    if (!this.context.authenticated) {
      return <NotAuthenticated />;
    }
    const { selectedPage, numberOfPages } = this.state;
    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          My Ideas
        </Header>
        <MyIdeasList ideas={this.state.ideas} />
        <div style={{ margin: "2rem auto", textAlign: "center" }}>
          <Pagination
            activePage={selectedPage}
            totalPages={numberOfPages}
            siblingRange={1}
            onPageChange={this.setPageNum}
          />
        </div>
      </Fragment>
    );
  }
}
MyIdeas.contextType = AuthContext;
export default MyIdeas;
