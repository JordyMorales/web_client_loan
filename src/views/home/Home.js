import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import NewClient from "../../components/NewCustomer/NewCustomer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "3%" }}>
        <Header as="h2" attached="top">
          For new customers
        </Header>
        <Segment attached>
          If you are not yet our client, you can register with your email and
          request a minimum loan of 50 $us
        </Segment>
        <NewClient />
      </Container>
    </div>
  );
};

export default Home;
