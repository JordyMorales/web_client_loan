import React from "react";
import NewCustomer from "./NewCustomer";
import renderer from "react-test-renderer";

test("Link changes the class when hovered", () => {
  const component = renderer.create(<NewCustomer />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.submitLoan();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
});
