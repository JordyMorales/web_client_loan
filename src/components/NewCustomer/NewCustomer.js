import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import axios from "axios";

const URL = "http://localhost:8080/api";

export default class NewCustomer extends Component {
  state = {
    email: "",
    amount: "",
    newLoan: ""
  };

  handleFieldChange = async (_, { name, value }) => {
    await this.setState({ [name]: value });
  };

  submitLoan = async (URL) => {
    const { email, amount } = this.state;
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
      alert("successful loan");
    } else {
      await this.setState({ amount: "" });
      alert(resLoan.data.message);
    }
  };

  render() {
    return (
      <div style={{ marginTop: "3%" }}>
        <Segment color="orange">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleFieldChange}
                placeholder="Enter your email"
                type="email"
                required
              />
              <Form.Input
                fluid
                name="amount"
                label="Amount to loan"
                value={this.state.amount}
                onChange={this.handleFieldChange}
                placeholder="Enter the loan amount"
                type="number"
                max="50"
                required
              />
            </Form.Group>
            <Button
              onClick={() => this.submitLoan(URL)}
              content="Save"
              color="orange"
            />
          </Form>
        </Segment>
      </div>
    );
  }
}
