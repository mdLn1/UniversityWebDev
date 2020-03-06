import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class Header extends Component {
  state = {
    token: ""
  };

  componentDidMount() {
    this.setState({ token: cookies.get("token") });
  }

  render() {
    if (this.state.token) {
      return (
        <Menu style={{ marginTop: "10px" }}>
          <Link route="/">
            <a className="item">Ideas Portal</a>
          </Link>
          <Menu.Menu position="right">
            <Link route="/submitIdea">
              <a className="item">Submit Idea</a>
            </Link>
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
