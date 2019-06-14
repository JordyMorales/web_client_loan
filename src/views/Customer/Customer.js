import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import Search from "../../components/Search/Search";

const Client = () => {
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "3%" }}>
        <Header as="h2" attached="top">
          Frequent customer
        </Header>
        <Segment attached>
          If you are already a customer, you can check your debt through your
          email
        </Segment>
        <Search />
      </Container>
    </div>
  );
};

export default Client;
