import React, { Component } from "react";
import { Container, Grid, Input, Button } from "semantic-ui-react";
import axios from "axios";

const URL = "http://localhost:8080/api/information";

export default class Payments extends Component {
  state = {
    email: null,
    debt: null,
    loading: false,
    value: ""
  };

  componentDidMount() {
    const { email, debt } = this.props;
    this.setState({ email, debt });
  }

  search = async val => {
    this.setState({ loading: true });
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/v1/data/users/",
      body: {
        email: this.state.username,
        mount: this.state.password
      }
    });

    this.setState({ Debt: res.data });
  };

  onChangeHandler = async e => {
    this.setState({ value: e.target.value });
    this.search(e.target.value);
  };

  render() {
    const { email, debt } = this.state;
    console.log(email, debt);
    return (
      <div>
        <Input placeholder="pay debt..." />
        <Button content="pay" primary />
      </div>
    );
  }
}
