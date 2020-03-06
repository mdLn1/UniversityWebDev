import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/dashboard">
        <a className="item">Ideas Portal</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/ideas/new-idea">
          <a className="item">Submit Idea</a>
        </Link>
        <Link route="/ideas/edit-idea">
          <a className="item">Edit Idea</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
