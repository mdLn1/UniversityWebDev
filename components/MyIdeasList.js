import React, { Component, Fragment } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export default class IdeasList extends Component {
  constructor(props) {
    super(props);
  }

  async deleteHandler(ID) {
    const token = cookies.get("token");
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.delete(`api/ideas/${ID}`, config);
      alert(res.data.success);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { ideas } = this.props;
    return (
      <Card.Group
        items={ideas.map((el, index) => {
          const footer = (
            <div>
              <div
                style={{ float: "right", fontSize: "12px", textAlign: "left" }}
              >
                <Fragment>
                  <p>Category: {el.category}</p>
                  <p>Total views: {el.views}</p>
                </Fragment>
                <p>
                  Date: <strong>{el.posted_time.slice(0, 10)}</strong>
                </p>
              </div>
              <div
                style={{ float: "left", fontSize: "14px", textAlign: "left" }}
              >
                <Icon name="thumbs up outline"></Icon>
                <span>{el.positiveVotes}</span>
                <span style={{ marginRight: "2rem" }} />
                <Icon name="thumbs down"></Icon>
                <span>{el.negativeVotes}</span>
                <br />
                <Button size="tiny">Comments ({el.commentsCount})</Button>

                <Button size="tiny">Attachments ({el.uploadsCount})</Button>
              </div>
            </div>
          );
          const header = (
            <Fragment>
              <div style={{ float: "left", textDecoration: "underline" }}>
                <Link href="/ideas/[id]" as={`/ideas/${el.ID}`}>
                  <a>
                    <h2 style={{ color: "teal" }}>{el.Title}</h2>
                  </a>
                </Link>
              </div>

              <div style={{ float: "right" }}>
                <Button color="red" onClick={() => this.deleteHandler(el.ID)}>
                  Delete
                </Button>
              </div>
            </Fragment>
          );
          return {
            key: index,
            header: header,
            description: el.description,
            fluid: true,
            extra: footer
          };
        })}
      />
    );
  }
}
