import React from "react";
import { Menu, Sticky } from "semantic-ui-react";


const Navbar = props => {
  return (
    <Sticky>
      <Menu inverted style={{ margin: 0 }}>
        <Menu.Item href="/">Home</Menu.Item>
      </Menu>
    </Sticky>
  );
};
export default Navbar;
