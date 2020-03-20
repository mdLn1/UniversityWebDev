import React, { Component } from "react";
import $ from "jquery";
import Chart from "react-google-charts";
import axios from "axios";

export default class example extends Component {
  state = {
    browserData: []
  };
  async componentDidMount() {
    try {
      const res = await axios.get("api/userDevice/browser");
      this.setState({ browserData: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.browserData.length > 0) {
      this.state.browserData.map(el => {
        console.log(el.browser_type);
        console.log(el.Num);
      });
    }
    //console.log(this.state.browserData);
    return (
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Task", "Hours per Day"],
          ["Work", 11],
          ["Eat", 2],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7]
        ]}
        options={{
          title: "Browser Usage"
        }}
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}
