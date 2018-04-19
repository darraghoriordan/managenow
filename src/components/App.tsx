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
    return (
      <div>
        <Router>
          <TopMenu />
          <Route exact={true} path={constants.ROUTE_LANDING}>
            <LandingPage teamMembers={this.state.teamMembers} />
          </Route>
          <Route exact={true} path={constants.ROUTE_SIGN_UP}>
            <SignUpPage />
          </Route>
          <Route exact={true} path={constants.ROUTE_SIGN_IN}>
            <SignInPage />
          </Route>

          <Route exact={true} path={constants.ROUTE_HOME}>
            <HomePage />
          </Route>
          <Route exact={true} path={constants.ROUTE_ACCOUNT}>
            <AccountPage />
          </Route>
        </Router>

        <AppFooter />
      </div>
    );
  }
}

export default App;
