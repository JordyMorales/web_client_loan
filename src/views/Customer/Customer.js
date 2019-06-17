import React, { useState } from "react";
import { Container, Header, Segment, Grid } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import Search from "../../components/Search/Search";
import Loan from "../../components/Loan/Loan";
import Payment from "../../components/Payment/Payment";
import SearchResult from "../../components/SearchResult/SearchResult";
import { getInfo, requestLoan, payLoan } from "../../utils/apiClient";

const Customer = () => {
  const [state, setState] = useState({
    email: "",
    newLoan: "",
    debt: undefined,
    pay: "",
    userMatch: false
  });

  const handleFieldChange = async (_, { name, value }) => {
    await setState({ ...state, [name]: value });
    console.log(state);
  };

  const submitSearch = async () => {
    console.log(state);
    const resp = await getInfo(state.email);
    if (resp.status === 200) {
      setState({ ...state, debt: resp.data.amount, userMatch: true });
    }
    if (resp.status === 204) {
      setState({
        ...state,
        debt: undefined,
        userMatch: false,
        pay: "",
        newLoan: ""
      });
      alert("No matches were found");
    }
  };

  const submitLoan = async () => {
    const resp = await requestLoan(state.email, state.newLoan);
    console.log(state.email, state.newLoan);
    if (resp.status === 201) {
      setState({ ...state, debt: resp.data.debt, pay: "", newLoan: "" });
      alert("successful loan");
      return;
    }
    if (resp.status === 200) {
      setState({ ...state, pay: "", newLoan: "" });
      alert(resp.data.message);
    }
  };

  const submitPay = async () => {
    if (state.pay <= state.debt) {
      const resp = await payLoan(state.email, state.pay);
      if (resp.status === 201) {
        setState({ ...state, debt: resp.data.debt, pay: "", newLoan: "" });
        alert(resp.data.message);
        return;
      }
      if (resp.status === 200) {
        alert(resp.data.message);
        setState({ ...state, pay: "", newLoan: "" });
      }
    } else {
      alert("Amount exceeds debt");
      setState({ ...state, pay: "", newLoan: "" });
    }
  };

  const { email, debt, newLoan, pay, userMatch } = state;
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
                  value={email}
                  clickHandler={submitSearch}
                  changehandler={handleFieldChange}
                />
              </Grid.Column>
              {userMatch && (
                <Grid.Column>
                  <SearchResult value={debt} />
                </Grid.Column>
              )}
            </Grid.Row>
            <Grid.Row>
              {userMatch && (
                <Grid.Column>
                  <Loan
                    value={newLoan}
                    clickHandler={submitLoan}
                    changehandler={handleFieldChange}
                  />
                </Grid.Column>
              )}
              {debtExists && (
                <Grid.Column>
                  <Payment
                    value={pay}
                    clickHandler={submitPay}
                    changehandler={handleFieldChange}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Customer;
