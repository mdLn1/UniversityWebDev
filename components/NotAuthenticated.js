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
              You need to be authenticated to access this page
            </Message.Header>
          </Message>
          <Message>
            If you have an account Go to{" "}
            <Link href="/login">
              <a>Login Page</a>
            </Link>{" "}
            otherwise please Go to{" "}
            <Link href="/register">
              <a>Register Page</a>
            </Link>
            .
          </Message>
        </div>
      </Fragment>
    );
  }
}
