import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Loan = props => {
  return (
    <Segment color="green">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="New Loan"
            name="newLoan"
            value={props.value}
            onChange={props.changehandler}
            placeholder="Apply for a loan..."
            type="number"
          />
        </Form.Group>
        <Button
          onClick={props.clickHandler}
          content="apply"
          positive
          disabled={!props.value}
        />
      </Form>
    </Segment>
  );
};

export default Loan;
