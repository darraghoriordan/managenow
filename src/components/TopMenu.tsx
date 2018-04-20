import * as React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import constants from "../constants/constants";
import AuthUserContext from "../contexts/AuthUserContext";
import { auth } from "../firebase/firebase";

function signOutFirebase(history: any) {
  auth.signOut().then(
    () => {
      history.push(constants.ROUTE_SIGN_IN);
    },
    error => {
      // tslint:disable-next-line:no-console
      console.error("Sign Out Error", error);
    }
  );
}

class TopMenu extends React.PureComponent<any, any> {
  public render() {
    return (
      <Menu fixed="top" inverted={true}>
        <Container>
          <Menu.Item as={Link} header={true} to={constants.ROUTE_HOME}>
            <Image
              size="mini"
              src="./logo.png"
              style={{ marginRight: "1.5em" }}
            />
            Manage Now
          </Menu.Item>
          <Menu.Item as={Link} to={constants.ROUTE_HOME}>
            Home
          </Menu.Item>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser === null ? (
                <Menu.Item as={Link} to={constants.ROUTE_SIGN_IN}>
                  Sign in
                </Menu.Item>
              ) : (
                <React.Fragment>
                  <Menu.Item as={Link} to={constants.ROUTE_LANDING}>
                    Team
                  </Menu.Item>

                  <Menu.Item
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => signOutFirebase(this.props.history)}
                  >
                    Sign Out
                  </Menu.Item>
                </React.Fragment>
              )
            }
          </AuthUserContext.Consumer>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(TopMenu);
