import React, { Component, Fragment } from "react";
import { Message } from "semantic-ui-react";
import Link from "next/link";

export default class NotAuthenticated extends Component {
  render() {
    return (
      <Fragment>
        <div
          style={{ maxWidth: "32rem", margin: "auto", padding: ".5rem 2rem" }}
        >
          <Message negative>
            <Message.Header>
              You are not authorized to access the content of this page
            </Message.Header>
          </Message>
          <Message>
            Please head back to main page{" "}
            <Link href="/">
              <a>Home</a>
            </Link>
          </Message>
        </div>
      </Fragment>
    );
  }
}
