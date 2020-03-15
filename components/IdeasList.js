import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import IdeaFooter from "../components/IdeaFooter";
import IdeaHeader from "../components/IdeaHeader";

export default class IdeasList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ideas } = this.props;
    return (
      <Card.Group
        items={ideas.map((el, index) => {
          const footer = (
            <IdeaFooter
              {...el}
              showComments={true}
              ideasListStyle={true}
              page="index"
            />
          );
          const header = (
            <IdeaHeader
              ideaId={el.ID}
              ideaTitle={el.Title}
              ideasListStyle={true}
            />
          );
          return {
            key: index,
            header: header,
            description: el.description,
            fluid: true,
            extra: footer
          };
        })}
      />
    );
  }
}
