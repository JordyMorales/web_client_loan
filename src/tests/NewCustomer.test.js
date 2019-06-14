import React from "react";
import NewCustomer from "../components/NewCustomer/NewCustomer";
import { shallow } from "enzyme";

describe("Save Button", () => {
  test("should be disabled when email and amount are not passed in", () => {
    const wrapper = shallow(<NewCustomer />);
    expect(wrapper.find('Button[content="Save"]').prop("disabled")).toBe(true);
  });
});
