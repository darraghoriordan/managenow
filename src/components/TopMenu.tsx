import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import constants from "../constants/constants";
import { auth } from "../firebase/firebase";

function signOutFirebase(event: any) {
  auth.signOut();
}

const TopMenu = (authUser: any) => (
  <Menu fixed="top" inverted={true}>
    <Container>
      <Menu.Item as={Link} header={true} to={constants.ROUTE_HOME}>
        <Image size="mini" src="./logo.png" style={{ marginRight: "1.5em" }} />
        Manage Now
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_HOME}>
        Home
      </Menu.Item>

      {authUser === null ? (
        <Menu.Item onClick={signOutFirebase}>Sign Out</Menu.Item>
      ) : (
        <Menu.Item as={Link} to={constants.ROUTE_SIGN_IN}>
          Sign in
        </Menu.Item>
      )}
      <Menu.Item as={Link} to={constants.ROUTE_LANDING}>
        Landing
      </Menu.Item>
      <Menu.Item as={Link} to={constants.ROUTE_ACCOUNT}>
        Account
      </Menu.Item>
    </Container>
  </Menu>
);

export default TopMenu;
