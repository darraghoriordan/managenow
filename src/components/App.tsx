import { User } from "firebase";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import withAuthentication from "../aspects/WithAuthentication";
import constants from "../constants/constants";
import { auth } from "../firebase/firebase";
import ITeamMember from "../models/ITeamMember";
import teamMembers from "../sampleData/sampleTeam";
import AccountPage from "./AccountPage";
import AppFooter from "./AppFooter";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import TopMenu from "./TopMenu";

export interface IAppState {
  teamMembers: ITeamMember[];
  loading: boolean;
}
export interface IAppProps {
  authenticated: boolean;
  authUser: User;
}
export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
    const state: IAppState = {
      loading: true,
      teamMembers
    };

    this.state = state;
  }
  public signOutFirebase(history: any) {
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

  public render() {
    const teamMembersProp = this.state.teamMembers;
    const authUserProp = this.props.authUser;
    const authenticatedProp = this.props.authenticated;

    return (
      <div>
        <Router>
          <div>
            <TopMenu
              authenticated={authenticatedProp}
              onSignOut={this.signOutFirebase}
            />
            <Route
              exact={true}
              path={constants.ROUTE_LANDING}
              // tslint:disable-next-line:jsx-no-lambda
              render={routeProps => {
                if (authenticatedProp) {
                  return (
                    <LandingPage
                      {...routeProps}
                      teamMembers={teamMembersProp}
                      authUser={authUserProp}
                    />
                  );
                }
                return <Redirect to={constants.ROUTE_SIGN_IN} />;
              }}
            />
            <Route
              exact={true}
              path={constants.ROUTE_SIGN_UP}
              component={SignInPage}
            />

            <Route
              exact={true}
              path={constants.ROUTE_SIGN_IN}
              // tslint:disable-next-line:jsx-no-lambda
              render={() => <SignInPage authenticated={authenticatedProp} />}
            />

            <Route
              exact={true}
              path={constants.ROUTE_HOME}
              component={HomePage}
            />

            <Route
              exact={true}
              path={constants.ROUTE_ACCOUNT}
              component={AccountPage}
            />
          </div>
        </Router>

        <AppFooter />
      </div>
    );
  }
}

export default withAuthentication(App);
