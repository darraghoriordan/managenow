import { User } from "firebase";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import constants from "../../constants/constants";
import { getUserOnce } from "../../firebase/db";
import {
  createUser,
  deleteTeamMember,
  saveTeamMember,
  saveTeamMemberAction
} from "../../firebase/db";
import { auth } from "../../firebase/firebase";
import { EmptyAppUser } from "../../models/EmptyAppUser";
import IAppUser, { AppUser } from "../../models/IAppUser";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import { validateTeamMemberForSave } from "../../services/validations";
import AppFooter from "../presentational/AppFooter";
import TopMenu from "../presentational/TopMenu";
import AccountPage from "./AccountPage";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import TeamListPage from "./TeamListPage";
import TeamMemberPage from "./TeamMemberPage";

export interface IAppState {
  loading: boolean;
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
      appUser: new EmptyAppUser(),
      authUser: null,
      authenticated: false,
      loading: true
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
  public onTeamMemberAdd = (teamMember: ITeamMember): Promise<ITeamMember> => {
    return validateTeamMemberForSave(teamMember)
      .then(validatedTeamMember =>
        saveTeamMember(this.state.appUser.uid, validatedTeamMember)
      )
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

        return Promise.resolve(teamMember);
      });
  };

  public onTeamMemberActionAdd = (
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) => {
    saveTeamMemberAction(this.state.appUser.uid, teamMemberId, teamMemberAction)
      .then(savedTeamMemberAction => {
        const actions = Object.assign(
          {},
          this.state.appUser.teamMembers[teamMemberId].actions
        );

        // if (!savedTeamMember.id) {
        //   teamMember.id = teamMember.name;
        // }
        actions[savedTeamMemberAction.id] = savedTeamMemberAction;

        this.setState(prevState => ({
          ...prevState,
          appUser: {
            ...prevState.appUser,
            teamMembers: {
              ...prevState.appUser.teamMembers,
              [teamMemberId]: {
                ...prevState.appUser.teamMembers[teamMemberId],
                actions
              }
            }
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
    deleteTeamMember(this.state.appUser.uid, teamMemberId)
      .then(() => {
        const teamMembers = Object.assign({}, this.state.appUser.teamMembers);
        delete teamMembers[teamMemberId];

        this.setState(prevState => ({
          ...prevState,
          appUser: {
            ...prevState.appUser,
            teamMembers
          }
        }));
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.log("Couldn't delete team member: " + error);
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
      appUser: new EmptyAppUser(),
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
          let foundUser: IAppUser = new AppUser(
            dataRef.val().displayName,
            dataRef.val().email,
            dataRef.val().uid,
            dataRef.val().teamMembers
          );

          if (!foundUser) {
            foundUser = new AppUser(
              authUser.displayName || "No Name",
              authUser.email || "No Email",
              authUser.uid,
              {}
            );
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
              displayName={this.state.appUser.firstName}
              onSignOut={this.signOutFirebase}
            />
            <Grid columns="equal">
              <Grid.Column />
              <Grid.Column width={8}>
                <Route
                  exact={true}
                  path={constants.ROUTE_LANDING}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamListPage
                          {...routeProps}
                          teamMembers={teamMembersProp}
                          isAuthenticated={authenticatedProp}
                          userDisplayName={this.state.appUser.firstName}
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
                  render={() => (
                    <SignInPage authenticated={authenticatedProp} />
                  )}
                />

                <Route
                  exact={true}
                  path={constants.ROUTE_HOME}
                  component={HomePage}
                />
                <Route
                  exact={true}
                  path={constants.ROUTE_TEAM_MEMBER}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          isAuthenticated={authenticatedProp}
                          onTeamMemberActionSave={this.onTeamMemberActionAdd}
                          onTeamMemberDelete={this.onTeamMemberDelete}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTE_SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTE_ACCOUNT}
                  component={AccountPage}
                />
              </Grid.Column>
              <Grid.Column />
            </Grid>
          </div>
        </Router>

        <AppFooter />
      </div>
    );
  }
}

export default App;
