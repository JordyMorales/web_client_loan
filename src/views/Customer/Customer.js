import React, { Component } from "react";
import { Container, Header, Segment, Grid } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import Search from "../../components/Search/Search";
import Loan from "../../components/Loan/Loan";
import Payment from "../../components/Payment/Payment";
import SearchResult from "../../components/SearchResult/SearchResult";
import { getInfo, requestLoan, payLoan } from "../../utils/apiClient";

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
    const resp = await getInfo(email);
    debugger;
    if (resp.status === 200) {
      this.setState({ debt: resp.data.amount, userMatch: true });
    }
    if (resp.status === 204) {
      this.setState({
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
    const resp = await requestLoan(email, newLoan);
    if (resp.status === 201) {
      this.setState({ debt: resp.data.debt, pay: "", newLoan: "" });
      alert("successful loan");
      return;
    }
    if (resp.status === 200) {
      this.setState({ pay: "", newLoan: "" });
      alert(resp.data.message);
    }
  };

  submitPay = async () => {
    const { email, pay, debt } = this.state;
    if (pay <= debt) {
      const resp = await payLoan(email, pay);
      if (resp.status === 201) {
        this.setState({ debt: resp.data.debt, pay: "", newLoan: "" });
        alert(resp.data.message);
        return;
      }
      if (resp.status === 200) {
        alert(resp.data.message);
        this.setState({ pay: "", newLoan: "" });
      }
    } else {
      alert("Amount exceeds debt");
      this.setState({ pay: "", newLoan: "" });
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
