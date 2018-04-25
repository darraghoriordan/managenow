import { User } from "firebase";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import constants from "../constants/constants";
import { createUser, deleteTeamMember, saveTeamMember } from "../firebase/db";
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
    this.onTeamMemberAdd = this.onTeamMemberAdd.bind(this);
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
  public onTeamMemberAdd = (teamMember: ITeamMember) => {
    saveTeamMember(this.state.appUser.uid, teamMember)
      .then(savedTeamMember => {
        const teamMembers = Object.assign({}, this.state.appUser.teamMembers);

        // if (!savedTeamMember.id) {
        //   teamMember.id = teamMember.name;
        // }
        teamMembers[savedTeamMember.id] = savedTeamMember;

        this.setState(prevState => ({
          ...prevState,
          appUser: {
            ...prevState.appUser,
            teamMembers
          }
        }));

        return Promise.resolve();
      })
      .catch((error: string) =>
        // tslint:disable-next-line:no-console
        console.log("Couldnt save team member: " + error)
      );
  };
  public onTeamMemberDelete = (teamMemberId: string) => {
    deleteTeamMember(this.state.appUser.uid, teamMemberId).then(() => {
      const teamMembers = Object.assign({}, this.state.appUser.teamMembers);
      delete teamMembers[teamMemberId];

      this.setState(prevState => ({
        ...prevState,
        appUser: {
          ...prevState.appUser,
          teamMembers
        }
      }));
    }).catch(error => {
      // tslint:disable-next-line:no-console
      console.log("Couldn't delete team member: "+error);
    });
  };
  public authenticateUser(authUser: User): Promise<any> {
    if (authUser) {
      return Promise.resolve(authUser);
    }

    return Promise.reject("No authenticated user available");
  }
  public setUnAuthenticatedState() {
    this.setState({
      appUser: new AppUser(),
      authUser: null,
      authenticated: false,
      loading: false
    });
  }
  public componentDidMount() {
    auth.onAuthStateChanged((authUser: User) => {
      this.authenticateUser(authUser)
        .then(authenticatedUser => getUserOnce(authenticatedUser.uid))
        .then(dataRef => {
          // if not exists create the new user
          let foundUser: IAppUser = dataRef.val() as IAppUser;

          if (!foundUser) {
            foundUser = new AppUser();
            foundUser.uid = authUser.uid;
            foundUser.displayName = authUser.displayName || "";
            foundUser.email = authUser.email || "";
            return createUser(foundUser);
          }
          return Promise.resolve(foundUser);
        })
        .then(appUser => {
          this.setState({
            appUser,
            authUser,
            authenticated: true,
            loading: false
          });
        })
        .catch(reason => {
          // tslint:disable-next-line:no-console
          console.log("setting null state: " + reason);
          this.setUnAuthenticatedState();
        });
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
                      onTeamMemberAdd={this.onTeamMemberAdd}
                      onTeamMemberDelete={this.onTeamMemberDelete}
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
