import React, { Component, Fragment } from "react";
import { Header, Message, Grid, Tab, Segment, Table } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import PieChart from "../components/PieChart";
import NotAuthorized from "../components/NotAuthorized";
import { AuthContext } from "../context/AuthenticationContext";
import RefreshError from "../components/RefreshError";
import { Chart } from "react-google-charts";
class Stats extends Component {
  static contextType = AuthContext;
  state = {
    browserData: this.props.browserData || [],
    osData: this.props.osData || [],
    mostUserSubmitIdeas: this.props.usersOrderedByNumberOfIdeas || [],
    connectionError: this.props.connectionError || false,
    chartSizeWidth: "50rem",
    chartSizeHeight: "30rem"
  };

  static async getInitialProps(props) {
    const { token } = cookies(props);
    try {
      if (token) axios.defaults.headers.common["x-auth-token"] = token;
      let res = await axios.get(`/api/userDevice/browser`);
      const { browserData } = res.data;
      res = await axios.get(`/api/userDevice/os`);
      const { osData } = res.data;
      res = await axios.get("api/stats/ideas-comments-stats");
      return {
        browserData,
        osData,
        ...res.data
      };
    } catch (err) {
      return { connectionError: "Connection failed" };
    }
  }

  // componentDidMount() {
  //   if (this.props.connectionError) {
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 6000);
  //     setInterval(
  //       () =>
  //         this.setState((prevState, props) => ({
  //           ...prevState,
  //           countDownTimer:
  //             prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
  //         })),
  //       1000
  //     );
  //   }
  // }

  render() {
    if (
      !this.context.authenticated ||
      !this.context.user?.role ||
      this.context.user.role !== "QA Manager"
    ) {
      return <NotAuthorized />;
    }
    console.log(this.props);
    const {
      connectionError,
      mostUserSubmitIdeas,
      browserData,
      osData,
      chartSizeHeight,
      chartSizeWidth
    } = this.state;

    const {
      mostRecentContributors,
      usersOrderedByComments,
      usersOrderedByNumberOfIdeas,
      allVisibleIdeasCount,
      anonymousCommentsCount,
      anonymousPostsCount,
      noCommentsPostsCount,
      commentsCount,
      contributorsPerDepartmentCount,
      ideasPerDepartmentCount
    } = this.props;
    return (
      <Fragment>
        {connectionError && <RefreshError pathname="/stats" />}
        <Header as="h2" color="teal" textAlign="center">
          Portal Statistics
        </Header>
        {!connectionError && (
          <Grid stackable columns={2}>
            
            <Grid.Column>
              <Segment>
                <Header size="medium">Most enthusiastic writers</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Position</Table.HeaderCell>
                      <Table.HeaderCell>Author</Table.HeaderCell>
                      <Table.HeaderCell>Number of ideas</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {usersOrderedByNumberOfIdeas.map((el, index) => (
                      <Table.Row key={el.email}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{el.name}</Table.Cell>
                        <Table.Cell>{el.number_of_ideas}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>{" "}
            <Grid.Column>
              <Segment>
                <Header size="medium">Most comments written</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Position</Table.HeaderCell>
                      <Table.HeaderCell>Author</Table.HeaderCell>
                      <Table.HeaderCell>Number of comments</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {usersOrderedByComments.map((el, index) => (
                      <Table.Row key={el.name}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{el.name}</Table.Cell>
                        <Table.Cell>{el.number_of_comments}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>{" "}
          </Grid>
        )}
        {!connectionError && (
          <Grid stackable columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <PieChart type={"mostUser"} data={mostUserSubmitIdeas} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Chart
                width={chartSizeWidth}
                height={chartSizeHeight}
                chartType="PieChart"
                data={[
                  ["Task", "Comments"],
                  ["Signed", commentsCount - anonymousCommentsCount],
                  ["Anonymous", anonymousCommentsCount]
                ]}
                options={{
                  title: "Signed and anonymous comments"
                }}
              />{" "}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Chart
                width={chartSizeWidth}
                height={chartSizeHeight}
                chartType="PieChart"
                data={[
                  ["Task", "Ideas"],
                  ["Signed", allVisibleIdeasCount - anonymousPostsCount],
                  ["Anonymous", anonymousPostsCount]
                ]}
                options={{
                  title: "Signed and anonymous ideas"
                }}
              />{" "}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Chart
                width={chartSizeWidth}
                height={chartSizeHeight}
                chartType="PieChart"
                data={[
                  ["Task", "Ideas"],
                  [
                    "With comments",
                    allVisibleIdeasCount - noCommentsPostsCount
                  ],
                  ["No comments", noCommentsPostsCount]
                ]}
                options={{
                  title: "Commented ideas"
                }}
              />{" "}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Chart
                width={chartSizeWidth}
                height={chartSizeHeight}
                chartType="PieChart"
                data={[
                  ["Task", "Contributors"],
                  ...contributorsPerDepartmentCount.map(el => [
                    el.department,
                    el.contributors
                  ])
                ]}
                options={{
                  title: "Contributors per department"
                }}
              />{" "}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Chart
                width={chartSizeWidth}
                height={chartSizeHeight}
                chartType="PieChart"
                data={[
                  ["Task", "Ideas"],
                  ...ideasPerDepartmentCount.map(el => [
                    el.department,
                    el.NumberIdeas
                  ])
                ]}
                options={{
                  title: "Ideas per department"
                }}
              />{" "}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <PieChart type={"browser"} data={browserData} />{" "}
            </Grid.Column>{" "}
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <PieChart type={"os"} data={osData} />{" "}
            </Grid.Column>
          </Grid>
        )}
      </Fragment>
    );
  }
}

export default Stats;
