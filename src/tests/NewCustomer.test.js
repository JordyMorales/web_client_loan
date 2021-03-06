import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewCustomer from "../components/NewCustomer/NewCustomer";

configure({ adapter: new Adapter() });

describe("Save Button", () => {
  test("should be disabled when email and amount are not passed in", () => {
    const wrapper = shallow(<NewCustomer values={{ email: "", amount: "" }} />);
    expect(wrapper.find('Button[content="Save"]').prop("disabled")).toBe(true);
  });
});
