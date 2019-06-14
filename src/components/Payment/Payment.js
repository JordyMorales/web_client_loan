import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Payment = props => {
  return (
    <div>
      <Segment color="blue">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Pay debt"
              name="pay"
              value={props.value}
              onChange={props.changehandler}
              placeholder="Amount..."
              type="number"
            />
          </Form.Group>
          <Button onClick={props.clickHandler} content="pay" primary />
        </Form>
      </Segment>
    </div>
  );
};

export default Payment;
