import React, { Component, Fragment } from "react";
import { Header, Message, Divider, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
import FileSaver from "FileSaver";
const cookies = new Cookies();

export default class DownloadData extends Component {
  constructor(props) {
    super(props);
    this.state = { apiErrors: [] };
  }

  onDownloadCSVClick = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
      const res = await axios.get("/api/management/download-csv-data");

      // reference code from https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
      var blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(blob, "SystemData.csv");
      else {
        // Others
        var a = document.createElement("a"),
          url = URL.createObjectURL(blob);
        a.href = url;
        a.download = "SystemData.csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    } catch (err) {
      if (err.response) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
  };

  onDownloadZipClick = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
      const res = await axios.get("/api/management/download-all-files");
      window.location.href = res.data;
    } catch (err) {
      if (err.response) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
  };

  render() {
    const { apiErrors } = this.state;
    return (
      <Fragment>
        <Header size="medium" style={{ textAlign: "center" }}>
          Download Portal data
        </Header>
        {apiErrors.length > 0 && (
          <Message negative>
            <Message.Header>
              There were some errors with your submission
            </Message.Header>
            <Message.List items={apiErrors} />
          </Message>
        )}
        <br />
        <Divider horizontal>CSV exported data</Divider>
        <div style={{ textAlign: "center" }}>
          <Button icon labelPosition="left" onClick={this.onDownloadCSVClick}>
            <Icon name="download" />
            Download CSV
          </Button>
        </div>
        <br />
        <Divider horizontal>Zipped uploads</Divider>
        <div style={{ textAlign: "center" }}>
          <Button icon labelPosition="left" onClick={this.onDownloadZipClick}>
            <Icon name="download" />
            Download attachments
          </Button>
        </div>
      </Fragment>
    );
  }
}
