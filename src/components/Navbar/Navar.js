import React from "react";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu inverted style={{ margin: 0 }}>
      <Menu.Item>
        <img src="https://react.semantic-ui.com/logo.png" alt="Company Logo" />
      </Menu.Item>
      <Menu.Item href="/">Home</Menu.Item>
      <Menu.Item href="/customer">Customer</Menu.Item>
    </Menu>
  );
};
export default Navbar;
