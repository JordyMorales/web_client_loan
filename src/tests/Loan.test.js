import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Loan from "../components/Loan/Loan";

configure({ adapter: new Adapter() });

describe("Save Button", () => {
  test("should be disabled when value are not passed in", () => {
    const wrapper = shallow(<Loan />);
    expect(wrapper.find('Button[content="apply"]').prop("disabled")).toBe(true);
  });
});
