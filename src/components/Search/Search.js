import React, { Component } from "react";
import { Button, Grid, Card, Segment, Form } from "semantic-ui-react";
import axios from "axios";

const URL = "http://localhost:8080/api";

export default class Search extends Component {
  state = {
    email: "",
    newLoan: "",
    debt: "",
    pay: ""
  };

  handleFieldChange = async (_, { name, value }) => {
    await this.setState({ [name]: value });
  };

  submitSearch = async () => {
    const { email } = this.state;
    const res = await axios(`${URL}/information?email=${email}`);
    if (res.status === 200) {
      this.setState({ debt: res.data.amount });
    }
    if (res.status === 204) {
      await this.setState({ debt: "", pay: "", newLoan: "" });
      alert("No matches were found");
    }
  };

  submitLoan = async () => {
    const { email, newLoan } = this.state;
    const resLoan = await axios({
      method: "post",
      url: `${URL}/loan`,
      data: {
        email,
        amount: Number(newLoan)
      }
    });
    if (resLoan.status === 200) {
      if (resLoan.data.error === 100) {
        await this.setState({ pay: "", newLoan: "" });
        alert(resLoan.data.message);
      } else {
        await this.setState({ debt: resLoan.data.debt, pay: "", newLoan: "" });
        alert("successful loan");
      }
    }
  };

  submitPay = async () => {
    const { email, pay } = this.state;
    const resPay = await axios({
      method: "post",
      url: `${URL}/payments`,
      data: {
        email,
        amount: Number(pay)
      }
    });
    if (resPay.status === 200) {
      if (resPay.data.error === 100) {
        alert(resPay.data.message);
        await this.setState({ pay: "", newLoan: "" });
      } else {
        await this.setState({ debt: resPay.data.debt, pay: "", newLoan: "" });
        alert(resPay.data.message);
      }
    }
  };

  renderResultSearch = () => {
    const { debt } = this.state;
    let dataResult = null;
    if (debt || debt === 0) {
      dataResult = <Card header={`${this.state.debt} $us`} meta="Debt" />;
    }
    return dataResult;
  };

  renderLoan = () => {
    const { debt } = this.state;
    let loan;
    if (debt || debt === 0) {
      loan = (
        <Segment color="green">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="New Loan"
                name="newLoan"
                value={this.state.newLoan}
                onChange={this.handleFieldChange}
                placeholder="Apply for a loan..."
                type="number"
              />
            </Form.Group>
            <Button
              onClick={() => this.submitLoan()}
              content="apply"
              positive
            />
          </Form>
        </Segment>
      );
    }
    return loan;
  };

  renderPayments = () => {
    let payments;
    if (this.state.debt > 0) {
      payments = (
        <Segment color="blue">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Pay debt"
                name="pay"
                value={this.state.pay}
                onChange={this.handleFieldChange}
                placeholder="Amount..."
                type="number"
              />
            </Form.Group>
            <Button onClick={() => this.submitPay()} content="pay" primary />
          </Form>
        </Segment>
      );
    }
    return payments;
  };

  render() {
    return (
      <div style={{ marginTop: "3%" }}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment color="grey">
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="First name"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleFieldChange}
                      icon="search"
                      placeholder="Search by email"
                      type="email"
                      required
                    />
                  </Form.Group>
                  <Button
                    onClick={() => this.submitSearch()}
                    content="Search"
                    color="grey"
                  />
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>{this.renderResultSearch()}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{this.renderLoan()}</Grid.Column>
            <Grid.Column>{this.renderPayments()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
