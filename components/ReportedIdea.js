import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";

export default class ReportedIdea extends Component {
  render() {
    let cardHeader = <IdeaHeader ideaTitle={"a title"} />;

    let cardDescription = (
      <div>
        <div style={{ float: "left", color: "black", fontSize: "16px" }}>
          <p>{"a description"}</p>
        </div>
      </div>
    );
    const style1 = { float: "right", fontSize: "12px", textAlign: "left" };
    const style2 = { float: "left", fontSize: "14px", textAlign: "left" };

    let cardExtra = (
      <Fragment>
        <div style={style1}>
          <p>Posted by: Anonymous</p>
          <p>
            Date: <strong>{"a time"}</strong>
          </p>
        </div>
        <div style={style2}>
          <Button size="tiny">Comments ({"7"})</Button>
          <Button size="tiny">Attachments ({"7"})</Button>
        </div>
      </Fragment>
    );
    return (
      <Card fluid>
        <Card.Content header={cardHeader} />
        <Card.Content description={cardDescription} />
        <Card.Content extra>{cardExtra}</Card.Content>
      </Card>
    );
  }
}
