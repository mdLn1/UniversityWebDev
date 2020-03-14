import React from "react";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";

export default props => {
  return (
    <Container>
      <Navbar />
      {props.children}
    </Container>
  );
};
