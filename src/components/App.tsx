import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import constants from "../constants/constants";
import ITeamMember from "../models/ITeamMember";
import teamMembers from "../sampleData/sampleTeam";

import AccountPage from "./AccountPage";
import AppFooter from "./AppFooter";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import TopMenu from "./TopMenu";

export interface IAppState {
  teamMembers: ITeamMember[];
}

export class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    const state: IAppState = { teamMembers };

    this.state = state;
  }

  public render() {
    const teamMembersProp = this.state.teamMembers;

    return (
      <div>
        <Router>
          <div>
            <TopMenu />
            <Route
              exact={true}
              path={constants.ROUTE_LANDING}
              // tslint:disable-next-line:jsx-no-lambda
              render={(routeProps) => <LandingPage {...routeProps} teamMembers={teamMembersProp} />} />

            <Route
              exact={true}
              path={constants.ROUTE_SIGN_UP}
              component={SignUpPage}
            />

            <Route
              exact={true}
              path={constants.ROUTE_SIGN_IN}
              component={SignInPage}
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

export default App;
