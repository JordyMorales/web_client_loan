import React, { Component } from "react";
import { Button, Grid, Input } from "semantic-ui-react";
import axios from "axios";

const URL = "http://localhost:8080/api";

export default class Search extends Component {
  state = {
    email: "",
    newLoan: "",
    debt: "",
    pay: "",
    loading: false
  };

  handleFieldChange = async (_, { name, value }) => {
    await this.setState({ [name]: value });
  };

  renderResultSearch = () => {
    const { debt } = this.state;
    let dataResult = null;
    if (debt || debt === 0) {
      dataResult = <h1>Debt: {this.state.debt}</h1>;
    }
    return dataResult;
  };

  renderLoan = () => {
    const { debt } = this.state;
    let loan;
    if (debt || debt === 0) {
      loan = (
        <div>
          <Input
            name="newLoan"
            value={this.state.newLoan}
            onChange={this.handleFieldChange}
            placeholder="Apply for a loan..."
          />
          <Button onClick={() => this.submitLoan()} content="apply" secondary />
        </div>
      );
    }
    return loan;
  };

  renderPayments = () => {
    let payments;
    if (this.state.debt > 0) {
      payments = (
        <div>
          <Input
            name="pay"
            value={this.state.pay}
            onChange={this.handleFieldChange}
            placeholder="pay debt..."
          />
          <Button onClick={() => this.submitPay()} content="pay" primary />
        </div>
      );
    }
    return payments;
  };

  submitSearch = async () => {
    const { email } = this.state;
    const res = await axios(`${URL}/information?email=${email}`);
    if (res.status === 200) {
      this.setState({ debt: res.data });
    }
    if (res.status === 204) {
      alert("No se encontraron coincidencias");
    }
  };

  submitLoan = async () => {
    const { email, newLoan } = this.state;
    debugger;
    const resLoan = await axios({
      method: "post",
      url: `${URL}/loan`,
      data: {
        email,
        amount: Number(newLoan)
      }
    });
    if (resLoan.status === 200) {
      await this.setState({ debt: resLoan.data.Debt, pay: "", newLoan: "" });
    }
  };

  submitPay = async () => {
    const { email, pay } = this.state;
    debugger;
    const resPay = await axios({
      method: "post",
      url: `${URL}/payments`,
      data: {
        email,
        amount: Number(pay)
      }
    });
    if (resPay.status === 200) {
      await this.setState({ debt: resPay.data.Debt });
    }
  };

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Input
              name="email"
              value={this.state.email}
              onChange={this.handleFieldChange}
              icon="search"
              placeholder="Search by email"
            />
            <Button
              onClick={() => this.submitSearch()}
              content="Search"
              green
            />
          </Grid.Column>
          <Grid.Column>{this.renderResultSearch()}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{this.renderLoan()}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{this.renderPayments()}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
