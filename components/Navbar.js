import React, { Component, Fragment } from "react";
import { Menu, Dropdown, Message } from "semantic-ui-react";
import Link from "next/link";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
const cookies = new Cookies();

// old ideas dropdown
// <Dropdown item text="Ideas">
//                 <Dropdown.Menu>
//                   <Dropdown.Item>
//                     <Link href="/ideas/submitIdea">
//                       <a>New Idea</a>
//                     </Link>
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Link href="/">
//                       <a>Edit Ideas</a>
//                     </Link>
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Link href="/">
//                       <a>Delete Ideas</a>
//                     </Link>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
class Navbar extends Component {
  state = {
    role: "",
    loggedOut: false
  };

 componentDidMount() {
    try {
      let decoded = jwt_decode(cookies.get("token"));
      this.setState({ role: decoded.user.role });
    } catch (err) {
      alert("no token")
    }
  }

  logout = () => {
    cookies.remove("token");
    this.setState({ role: "", loggedOut: true });
    if (typeof Storage !== "undefined") localStorage.clear();
    setTimeout(() => this.setState({ loggedOut: false }), 3000);
  };

  render() {
    return (
      <Fragment>
        <Menu style={{ marginTop: "10px" }}>
          <Link href="/">
            <a className="item">Ideas Portal</a>
          </Link>
          <Menu.Menu position="right">
            {this.state.role === "QA Manager" && (
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
                  </Dropdown.Menu>
                </Dropdown>
              </Fragment>
            )}
            {this.state.role && (
              <Fragment>
                <Link href="/ideas/submitIdea">
                  <a className="item">New idea</a>
                </Link>
                <Link href="/ideas/myIdeas">
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
            {!this.state.role && (
              <Link href="/login">
                <a className="item">Login</a>
              </Link>
            )}
          </Menu.Menu>
        </Menu>
        {this.state.loggedOut && (
          <Message success header="Success" content="You have logged out" />
        )}
      </Fragment>
    );
  }
}

export default Navbar;
