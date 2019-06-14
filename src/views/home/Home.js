import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import NewCustomer from "../../components/NewCustomer/NewCustomer";
import { requestLoan } from "../../utils/apiClient";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      amount: ""
    };
  }

  handleFieldChange = async (_, { name, value }) => {
    await this.setState({ [name]: value });
  };

  submitLoan = async () => {
    const { email, amount } = this.state;
    if (amount <= 50) {
      const resp = await requestLoan(email, amount);
      if (resp.status === 201) {
        this.setState({ email: "", amount: "" });
        resp.data.new
          ? alert("New user created successfully")
          : alert("Existing customer, successful loan!");
      }
    } else {
      this.setState({ amount: "" });
      alert("We cannot accept loans over 50$ on first loan");
    }
  };

  render() {
    const { email, amount } = this.state;
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
            clickHandler={this.submitLoan}
            changehandler={this.handleFieldChange}
          />
        </Container>
      </div>
    );
  }
}
