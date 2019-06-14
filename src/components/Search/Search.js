import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Search = props => {
  return (
    <Segment color="grey">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            name="email"
            value={props.value}
            onChange={props.changehandler}
            icon="search"
            placeholder="Search by email"
            type="email"
            required
          />
        </Form.Group>
        <Button
          onClick={props.clickHandler}
          content="Search"
          color="grey"
          disabled={!props.value}
        />
      </Form>
    </Segment>
  );
};

export default Search;
