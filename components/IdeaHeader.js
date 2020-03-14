import React, { Component, Fragment } from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";

export default class IdeaHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ideaId, ideaTitle } = this.props;
    return (
      <Fragment>
        <div style={{ float: "left", textDecoration: "underline" }}>
          <Link href="/ideas/[id]" as={`/ideas/${ideaId}`}>
            <a>
              <h2 style={{ color: "teal" }}>{ideaTitle}</h2>
            </a>
          </Link>
        </div>
        <div style={{ float: "right", textDecoration: "underline" }}>
          <Button color="red" size="mini">
            Report
          </Button>
        </div>
      </Fragment>
    );
  }
}
