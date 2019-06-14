import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import NewCustomer from "../../components/NewCustomer/NewCustomer";
import axios from "axios";

const URL = "http://localhost:8080/api";

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
      const resLoan = await axios({
        method: "post",
        url: `${URL}/loan`,
        data: {
          email,
          amount: Number(amount)
        }
      });
      if (resLoan.status === 201) {
        await this.setState({ email: "", amount: "" });
        resLoan.data.new
          ? alert("New user created successfully")
          : alert("Existing customer, successful loan!");
      }
    } else {
      await this.setState({ amount: "" });
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
