import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import constants from "../constants/constants";

interface ITopMenuProps extends RouteComponentProps<any> {
  onSignOut: (history: any) => void;
  authenticated: boolean;
  tm:any;
}

class TopMenu extends React.PureComponent<ITopMenuProps, any> {
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
          {!this.props.authenticated ? (
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
                onClick={() => this.props.onSignOut(this.props.history)}
              >
                Sign Out
              </Menu.Item>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(TopMenu);
