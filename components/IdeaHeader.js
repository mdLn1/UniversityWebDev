import React, { Component, Fragment } from "react";
import Link from "next/link";
import ReportModal from "./ReportModal";

export default class IdeaHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ideaId, ideaTitle, ideasListStyle } = this.props;

    return (
      <Fragment>
        {!ideasListStyle ? (
          <div style={{ float: "left", color: "teal", fontSize: "18px" }}>
            <p>{ideaTitle}</p>
          </div>
        ) : (
          <div style={{ float: "left", textDecoration: "underline" }}>
            <Link href="/ideas/[id]" as={`/ideas/${ideaId}`}>
              <a>
                <h2 style={{ color: "teal" }}>{ideaTitle}</h2>
              </a>
            </Link>
          </div>
        )}
        <div style={{ float: "right" }}>
          <ReportModal ideaId={ideaId} />
        </div>
      </Fragment>
    );
  }
}
