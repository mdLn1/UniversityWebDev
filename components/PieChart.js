import React, { Component, Fragment } from "react";
import { Segment } from "semantic-ui-react";
import Chart from "react-google-charts";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = [];
    let title = "";
    if (this.props.type == "browser") {
      data = this.props.data.map(el => {
        return [el.browser_type, el.Num];
      });
      data.unshift(["Type", "Value"]);
      title = "User Browser Usage";
    }

    if (this.props.type == "os") {
      data = this.props.data.map(el => {
        return [el.os_platform, el.Num];
      });
      data.unshift(["Type", "Value"]);
      title = "User OS Usage";
    }

    if (this.props.type == "mostViewed") {
      data = this.props.data.map(el => {
        let d1 = "ID:" + el.ID + " - " + el.title;
        return [d1, el.views];
      });
      data.unshift(["Type", "Value"]);
      title = "Top 5 Most Viewed Ideas";
    }

    if (this.props.type == "highestRated") {
      data = this.props.data.map(el => {
        let d1 = "ID:" + el.ID + " - " + el.title;
        return [d1, el.positiveVotes];
      });
      data.unshift(["Type", "Value"]);
      title = "Top 5 Highest Rated Ideas";
    }

    if (this.props.type == "mostUser") {
      console.log(data);
      data = this.props.data.map(el => {
        return [el.name, el.number_of_ideas];
      });
      data.unshift(["Type", "Value"]);
      title = "Users with highest submission rate";
    }

    return (
      <Segment color="teal" textAlign="left">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              title: title
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
      </Segment>
    );
  }
}
