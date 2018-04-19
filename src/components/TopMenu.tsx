import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";

import constants from "../constants/constants";

const TopMenu = () => (
  <Menu fixed="top" inverted={true}>
    <Container>
      <Menu.Item as={Link} header={true} to={constants.ROUTE_HOME}>
        <Image size="mini" src="./logo.png" style={{ marginRight: "1.5em" }} />
        Manage Now
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_HOME}>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_SIGN_IN}>
        Sign in
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_LANDING}>
        Landing
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_ACCOUNT}>
        Account
      </Menu.Item>

      <Dropdown item={true} simple={true} text="Dropdown">
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className="dropdown icon" />
            <span className="text">Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
);

export default TopMenu;
