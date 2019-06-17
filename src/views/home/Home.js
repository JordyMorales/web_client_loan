import React, { useState } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import NewCustomer from "../../components/NewCustomer/NewCustomer";
import { requestLoan } from "../../utils/apiClient";

const Home = () => {
  const [state, setState] = useState({ email: "", amount: "" });

  const handleFieldChange = async (_, { name, value }) => {
    await setState({ ...state, [name]: value });
    console.log(state);
  };

  const submitLoan = async () => {
    if (amount <= 50) {
      const resp = await requestLoan(state.email, state.amount);
      if (resp.status === 201) {
        setState({ ...state, email: "", amount: "" });
        resp.data.new
          ? alert("New user created successfully")
          : alert("Existing customer, successful loan!");
      }
    } else {
      setState({ amount: "" });
      alert("We cannot accept loans over 50$ on first loan");
    }
  };

  const { email, amount } = state;
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
        <NewCustomer
          values={{ email, amount }}
          clickHandler={submitLoan}
          changehandler={handleFieldChange}
        />
      </Container>
    </div>
  );
};
export default Home;
