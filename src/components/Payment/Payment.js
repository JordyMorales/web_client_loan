import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Payment = ({ value, changehandler, clickHandler }) => {
  return (
    <div>
      <Segment color="blue">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Pay debt"
              name="pay"
              value={value}
              onChange={changehandler}
              placeholder="Amount..."
              type="number"
            />
          </Form.Group>
          <Button
            onClick={clickHandler}
            content="pay"
            primary
            disabled={!value}
          />
        </Form>
      </Segment>
    </div>
  );
};

export default Payment;
