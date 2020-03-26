import React, { Component, Fragment } from "react";
import { Menu, Dropdown, Message } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
import { AuthContext } from "../context/AuthenticationContext";
class Navbar extends Component {
  static contextType = AuthContext;
  state = { loggedOut: false };
  logout = () => {
    cookies.remove("token");
    this.setState({ loggedOut: true });
    if (typeof Storage !== "undefined") localStorage.clear();
    this.context.logoutUser();
    setTimeout(() => this.setState({ loggedOut: false }), 3000);
    Router.push("/");
  };

  revealMenu = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  render() {
    const { name, role, authenticated } = this.props;
    const { loggedOut } = this.state;
    return (
      <Fragment>
        <div className="large-screen nav" style={{ marginTop: "10px" }}>
          <Menu>
            <Link href="/">
              <a className="item">Ideas Portal</a>
            </Link>
            {name && <Menu.Item name="username">Hello, {name}!</Menu.Item>}
            <Menu.Menu position="right">
              {role === "QA Manager" && (
                <Fragment>
                  <Dropdown item text="Admin console">
                    <Dropdown.Menu>
                      <Link href="/portal-data">
                        <Dropdown.Item>
                          <a>Portal data</a>
                        </Dropdown.Item>
                      </Link>
                      <Link href="/content-issues">
                        <Dropdown.Item>
                          <a>Content issues</a>
                        </Dropdown.Item>
                      </Link>
                      <Link href="/stats">
                        <Dropdown.Item>
                          <a>Statistics</a>
                        </Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </Fragment>
              )}
              {authenticated && (
                <Fragment>
                  <Link href="/submitIdea">
                    <a className="item">New idea</a>
                  </Link>
                  <Link href="/myIdeas">
                    <a className="item">My ideas</a>
                  </Link>
                  <span
                    className="item"
                    style={{ cursor: "pointer" }}
                    onClick={this.logout}
                  >
                    Logout
                  </span>
                </Fragment>
              )}
              {!authenticated && (
                <Link href="/login">
                  <a className="item">Login</a>
                </Link>
              )}
            </Menu.Menu>
          </Menu>
        </div>
        <div className="mobile nav"  style={{ marginTop: "10px" }}>
          <Menu>
            <Link href="/">
              <a className="item">Ideas Portal</a>
            </Link>
            {!authenticated && (
              <Link href="/login">
                <a className="item">Login</a>
              </Link>
            )}
            {authenticated && (
              <span
                className="icon item"
                style={{
                  borderLeft: "1px solid rgba(34,36,38,.15)",
                  cursor: "pointer"
                }}
                onClick={this.revealMenu}
              >
                Menu
              </span>
            )}
          </Menu>
          <div id="myLinks">
            <Fragment>
              <Link href="/submitIdea">
                <a className="item">New idea</a>
              </Link>
              <Link href="/myIdeas">
                <a className="item">My ideas</a>
              </Link>
            </Fragment>

            {role === "QA Manager" && (
              <Fragment>
                <Link href="/portal-data">
                  <a className="item">Portal data</a>
                </Link>
                <Link href="/content-issues">
                  <a className="item">Content issues</a>
                </Link>
                <Link href="/stats">
                  <a className="item">Statistics</a>
                </Link>
              </Fragment>
            )}
            <span
              className="item"
              style={{ cursor: "pointer" }}
              onClick={this.logout}
            >
              Logout
            </span>
          </div>
        </div>
        {loggedOut && (
          <Message success header="Success" content="You have logged out" />
        )}
      </Fragment>
    );
  }
}

export default Navbar;
