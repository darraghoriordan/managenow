import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Dropdown, Menu } from "semantic-ui-react";
import constants from "../../constants/constants";

interface ITopMenuProps extends RouteComponentProps<any> {
  displayName: string;
  onSignOut: (history: any) => void;
  authenticated: boolean;
}

class TopMenu extends React.PureComponent<ITopMenuProps, any> {
  public render() {
    return (
      <Menu fixed="top">
        <Container>
          <Menu.Item as={Link} header={true} to={constants.ROUTES.HOME}>
            {/* <Image
              size="mini"
              src="./logo.png"
              style={{ marginRight: "1.5em" }}
            /> */}
          {constants.APP_NAME}
          </Menu.Item>
          <Menu.Item as={Link} to={constants.ROUTES.HOME}>
            Home
          </Menu.Item>
          {!this.props.authenticated ? (
            <Menu.Item as={Link} to={constants.ROUTES.SIGN_IN}>
              Sign in
            </Menu.Item>
          ) : (
            <React.Fragment>
              <Menu.Item as={Link} to={constants.ROUTES.LANDING}>
                Team
              </Menu.Item>

              <Menu.Menu position="right">
                <Dropdown item={true} text={this.props.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="edit"
                      text="Signout"
                      // tslint:disable-next-line:jsx-no-lambda
                      onClick={() => this.props.onSignOut(this.props.history)}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(TopMenu);
