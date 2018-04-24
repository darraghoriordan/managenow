import { User } from "firebase";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import constants from "../constants/constants";
import { createUser } from "../firebase/db";
import { getUserOnce } from "../firebase/db";
import { auth } from "../firebase/firebase";
import IAppUser, { AppUser } from "../models/IAppUser";
import ISource from "../models/ISource";
import ITeamMember from "../models/ITeamMember";
import techniqueSources from "../sampleData/sampleSources";
import AccountPage from "./AccountPage";
import AppFooter from "./AppFooter";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import TopMenu from "./TopMenu";

export interface IAppState {
  loading: boolean;
  techniqueSources: ISource[];
  appUser: IAppUser;
  authUser: User | null;
  authenticated: boolean;
}

// export interface IAppProps {
//   authenticated: boolean;
//   authUser: User;
//   appUser: IAppUser;
// }
export class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);

    const state: IAppState = {
      appUser: new AppUser(),
      authUser: null,
      authenticated: false,
      loading: true,
      techniqueSources
    };
    this.onAddTeamMember = this.onAddTeamMember.bind(this);
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
  public onAddTeamMember = (teamMember: ITeamMember) => {
    const teamMembers = Object.assign({}, this.state.appUser.teamMembers);
    // addUpdateTeamMember(appUser.uid, teamMember).then(
    //  () => {
    if (!teamMember.id) {
      teamMember.id = teamMember.name;
    }
    teamMembers[teamMember.id] = teamMember;

    this.setState(prevState => ({
      ...prevState,
      appUser: {
        ...prevState.appUser,
        teamMembers
      }
    }));

    //   },
    //   error =>
    // tslint:disable-next-line:no-console
    //      console.log("Couldnt save team member: " + error)
    //  );
  };
  public componentDidMount() {
    // if (!authCon(authUser)) {
    //   this.props.history.push(constants.ROUTE_SIGN_IN);
    // }
    //  const authCon = (authUser: any) => !!this.props.authUser;
    auth.onAuthStateChanged((authUser: User) => {
      if (authUser) {
        // try get the appUser
        getUserOnce(authUser.uid)
          .then(dataRef => {
            // if not exists create the new user
            let foundUser: IAppUser = dataRef.val() as IAppUser;

            if (!foundUser) {
              foundUser = new AppUser();
              foundUser.uid = authUser.uid;
              foundUser.displayName = authUser.displayName || "";
              foundUser.email = authUser.email || "";
            }
            createUser(foundUser);

            this.setState({
              appUser: foundUser,
              authUser,
              authenticated: true
            });
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error);
          });
      } else {
        this.setState({
          appUser: new AppUser(),
          authUser: null,
          authenticated: false,
          loading: false
        });
      }
    });
  }
  public render() {
    const teamMembersProp = this.state.appUser.teamMembers;
    const authenticatedProp = this.state.authenticated;

    return (
      <div>
        <Router>
          <div>
            <TopMenu
              authenticated={authenticatedProp}
              onSignOut={this.signOutFirebase}
              tm={teamMembersProp}
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
                      isAuthenticated={authenticatedProp}
                      userDisplayName={this.state.appUser.displayName}
                      onAddTeamMember={this.onAddTeamMember}
                    />
                  );
                }
                return <Redirect to={constants.ROUTE_SIGN_IN} />;
              }}
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

export default App;
