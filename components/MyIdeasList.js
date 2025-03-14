import React, { Component, Fragment } from "react";
import { Card, Button, Icon, Segment } from "semantic-ui-react";
import Link from "next/link";
import axios from "axios";
import CommentsModal from "./CommentsModal";
import AttachmentsModal from "./AttachmentsModal";

export default class IdeasList extends Component {
  constructor(props) {
    super(props);
  }

  async deleteHandler(ID) {
    try {
      const res = await axios.delete(`/api/ideas/${ID}`);
      alert(res.data.success);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { ideas } = this.props;
    if (ideas.length == 0) {
      return (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Segment color="teal" style={{ textAlign: "center" }}>
            <p>No ideas submitted yet.</p>
          </Segment>
        </div>
      );
    }
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
                <CommentsModal ID={el.ID} commentsCount={el.commentsCount} />

                <AttachmentsModal
                  ID={el.ID}
                  uploadsCount={el.uploadsCount}
                  size="tiny"
                />
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
