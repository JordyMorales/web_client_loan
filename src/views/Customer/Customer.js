import React, { Component } from "react";
import { Container, Header, Segment, Grid } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import Search from "../../components/Search/Search";
import Loan from "../../components/Loan/Loan";
import Payment from "../../components/Payment/Payment";
import SearchResult from "../../components/SearchResult/SearchResult";
import axios from "axios";

const URL = "http://localhost:8080/api";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newLoan: "",
      debt: undefined,
      pay: "",
      userMatch: false
    };
  }

  handleFieldChange = async (_, { name, value }) => {
    await this.setState({ [name]: value });
  };

  submitSearch = async () => {
    const { email } = this.state;
    const res = await axios(`${URL}/information?email=${email}`);
    if (res.status === 200) {
      this.setState({ debt: res.data.amount, userMatch: true });
    }
    if (res.status === 204) {
      await this.setState({
        debt: undefined,
        userMatch: false,
        pay: "",
        newLoan: ""
      });
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
    if (resLoan.status === 201) {
      await this.setState({ debt: resLoan.data.debt, pay: "", newLoan: "" });
      alert("successful loan");
      return;
    }
    if (resLoan.status === 200) {
      await this.setState({ pay: "", newLoan: "" });
      alert(resLoan.data.message);
    }
  };

  submitPay = async () => {
    const { email, pay, debt } = this.state;
    if (pay <= debt) {
      const resPay = await axios({
        method: "post",
        url: `${URL}/payments`,
        data: {
          email,
          amount: Number(pay)
        }
      });
      if (resPay.status === 201) {
        await this.setState({ debt: resPay.data.debt, pay: "", newLoan: "" });
        alert(resPay.data.message);
        return;
      }
      if (resPay.status === 200) {
        alert(resPay.data.message);
        await this.setState({ pay: "", newLoan: "" });
      }
    } else {
      alert("Amount exceeds debt");
      await this.setState({ pay: "", newLoan: "" });
    }
  };

  render() {
    const { debt, userMatch } = this.state;
    const debtExists = debt > 0;
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
          <div style={{ marginTop: "3%" }}>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Search
                    value={this.state.email}
                    clickHandler={this.submitSearch}
                    changehandler={this.handleFieldChange}
                  />
                </Grid.Column>

                {userMatch && (
                  <Grid.Column>
                    <SearchResult value={this.state.debt} />
                  </Grid.Column>
                )}
              </Grid.Row>
              <Grid.Row>
                {userMatch && (
                  <Grid.Column>
                    <Loan
                      value={this.state.newLoan}
                      clickHandler={this.submitLoan}
                      changehandler={this.handleFieldChange}
                    />
                  </Grid.Column>
                )}
                {debtExists && (
                  <Grid.Column>
                    <Payment
                      value={this.state.pay}
                      clickHandler={this.submitPay}
                      changehandler={this.handleFieldChange}
                    />
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}
