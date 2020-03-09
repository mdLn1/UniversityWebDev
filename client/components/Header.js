import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "../routes";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
const cookies = new Cookies();

class Header extends Component {
  state = {
    role: ""
  };

  async componentDidMount() {
    try {
      let decoded = jwt_decode(cookies.get("token"));
      this.setState({ role: decoded.user.role });
    } catch (err) {
      // is token cookie does not exist will catch this error..
    }
  }

  render() {
    if (this.state.role === "QA Manager") {
      return (
        <Menu style={{ marginTop: "10px" }}>
          <Link route="/">
            <a className="item">Ideas Portal</a>
          </Link>
          <Menu.Menu position="right">
            <Dropdown item text="Categories">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/categories/addCategory">
                    <a>Add Category</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/">
                    <a>Delete Categories</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Ideas">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/ideas/submitIdea">
                    <a>Submit Idea</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/">
                    <a>Edit Ideas</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/">
                    <a>Delete Ideas</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link route="/logout">
              <a className="item">Logout</a>
            </Link>
          </Menu.Menu>
        </Menu>
      );
    }
    if (this.state.role) {
      return (
        <Menu style={{ marginTop: "10px" }}>
          <Link route="/">
            <a className="item">Ideas Portal</a>
          </Link>
          <Menu.Menu position="right">
            <Dropdown item text="Ideas">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/ideas/submitIdea">
                    <a>Submit Idea</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/">
                    <a>Edit Ideas</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/">
                    <a>Delete Ideas</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link route="/logout">
              <a className="item">Logout</a>
            </Link>
          </Menu.Menu>
        </Menu>
      );
    }
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">Ideas Portal</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/login">
            <a className="item">Login</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
