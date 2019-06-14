import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const NewCustomer = props => {
  return (
    <div style={{ marginTop: "3%" }}>
      <Segment color="orange">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="email"
              label="Email"
              value={props.values.email}
              onChange={props.changehandler}
              placeholder="Enter your email"
              type="email"
              required
            />
            <Form.Input
              fluid
              name="amount"
              label="Amount to loan"
              value={props.values.amount}
              onChange={props.changehandler}
              placeholder="Enter the loan amount"
              type="number"
              max="50"
              required
            />
          </Form.Group>
          <Button onClick={props.clickHandler} content="Save" color="orange" />
        </Form>
      </Segment>
    </div>
  );
};

export default NewCustomer;
