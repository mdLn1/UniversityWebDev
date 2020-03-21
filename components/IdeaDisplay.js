import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import IdeaFooter from "../components/IdeaFooter";
import IdeaHeader from "../components/IdeaHeader";

export default class CommentsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { idea } = this.props;
    let cardHeader = <IdeaHeader ideaTitle={idea.Title} ideaId={idea.ID} />;

    let cardDescription = (
      <div>
        <div style={{ float: "left", color: "black", fontSize: "16px" }}>
          <p>{idea.description}</p>
        </div>
      </div>
    );

    let cardExtra = <IdeaFooter {...idea} />;

    return (
      <Card fluid>
        <Card.Content header={cardHeader} />
        <Card.Content description={cardDescription} />
        <Card.Content extra>{cardExtra}</Card.Content>
      </Card>
    );
  }
}
