import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Payment from "../components/Payment/Payment";

configure({ adapter: new Adapter() });

describe("Save Button", () => {
  test("should be disabled when email and amount are not passed in", () => {
    const wrapper = shallow(<Payment />);
    expect(wrapper.find('Button[content="pay"]').prop("disabled")).toBe(true);
  });
});
