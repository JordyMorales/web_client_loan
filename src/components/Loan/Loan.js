import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Loan = ({ value, changehandler, clickHandler }) => {
  return (
    <Segment color="green">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="New Loan"
            name="newLoan"
            value={value}
            onChange={changehandler}
            placeholder="Apply for a loan..."
            type="number"
          />
        </Form.Group>
        <Button
          onClick={clickHandler}
          content="apply"
          positive
          disabled={!value}
        />
      </Form>
    </Segment>
  );
};

export default Loan;
