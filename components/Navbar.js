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

  async componentDidMount() {
    try {
      let decoded = jwt_decode(cookies.get("token"));
      this.setState({ role: decoded.user.role });
    } catch (err) {
      // is token cookie does not exist will catch this error..
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
                <Dropdown item text="Categories">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link href="/categories/addCategory">
                        <a>Add Category</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/">
                        <a>Delete Categories</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Fragment>
            )}
            {this.state.role && (
              <Fragment>
                <Link href="/ideas/submitIdea">
                  <a className="item">New idea</a>
                </Link>
                <Link href="/ideas">
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
