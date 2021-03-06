import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const NewCustomer = ({
  values: { email, amount },
  changehandler,
  clickHandler
}) => {
  return (
    <div style={{ marginTop: "3%" }}>
      <Segment color="orange">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="email"
              label="Email"
              value={email}
              onChange={changehandler}
              placeholder="Enter your email"
              type="email"
              required
            />
            <Form.Input
              fluid
              name="amount"
              label="Amount to loan"
              value={amount}
              onChange={changehandler}
              placeholder="Enter the loan amount"
              type="number"
              max="50"
              required
            />
          </Form.Group>
          <Button
            onClick={clickHandler}
            content="Save"
            color="orange"
            disabled={!email && !amount}
          />
        </Form>
      </Segment>
    </div>
  );
};

export default NewCustomer;
