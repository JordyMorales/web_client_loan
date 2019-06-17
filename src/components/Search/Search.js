import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const Search = ({ value, changehandler, clickHandler }) => {
  return (
    <Segment color="grey">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            name="email"
            value={value}
            onChange={changehandler}
            icon="search"
            placeholder="Search by email"
            type="email"
            required
          />
        </Form.Group>
        <Button
          onClick={clickHandler}
          content="Search"
          color="grey"
          disabled={!value}
        />
      </Form>
    </Segment>
  );
};

export default Search;
