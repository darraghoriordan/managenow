import { User } from "firebase";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { getUserOnce } from "../../api/db";
import {
  createUser,
  deleteTeamMember,
  saveTeamMember,
  saveTeamMemberAction,
  saveTeamMemberInteraction,
  saveTeamMemberTodo
} from "../../api/db";
import { auth } from "../../api/firebase";
import constants from "../../constants/constants";
import { EmptyAppUser } from "../../models/EmptyAppUser";
import IAppUser, { AppUser } from "../../models/IAppUser";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberDevelopmentAction from "../../models/ITeamMemberDevelopmentAction";
import ITeamMemberInteraction from "../../models/ITeamMemberInteractions";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";
import { validateTeamMemberForSave } from "../../services/validations";
import AppFooter from "../presentational/AppFooter";
import HeaderMenu from "../presentational/HeaderMenu";
import AddDevelopmentTaskPage from "./AddDevelopmentTaskPage";
import AddTeamMemberPage from "./AddTeamMemberPage";
import AddTodoPage from "./AddTodoPage";
import AppSalesPage from "./AppSalesPage";
import OpenListPage from "./OpenListPage";
import ScrollToTop from "./ScrollToTop";
import SignInPage from "./SignInPage";
import TeamMemberDetailsPage from "./TeamMemberDetailsPage";
import TeamMemberDevelopmentActionPage from "./TeamMemberDevelopmentActionPage";
import TeamMemberInteractionsPage from "./TeamMemberInteractionsPage";
import TeamMemberListPage from "./TeamMemberListPage";
import TeamMemberTodoListPage from "./TeamMemberTodoListPage";

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
    this.onTeamMemberActionAdd = this.onTeamMemberActionAdd.bind(this);
    this.onTodoSave = this.onTodoSave.bind(this);
    this.onInteractionAdd = this.onInteractionAdd.bind(this);
    this.onTeamMemberDelete = this.onTeamMemberDelete.bind(this);

    this.state = state;
  }
  public signOutFirebase(history: any) {
    auth.signOut().then(
      () => {
        history.push(constants.ROUTES.SIGN_IN);
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
        const teamMembers = Object.assign(
          {},
          this.state.appUser.teamMembers || {}
        );

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
    teamMemberAction: ITeamMemberDevelopmentAction
  ) => {
    saveTeamMemberAction(this.state.appUser.uid, teamMemberId, teamMemberAction)
      .then(savedTeamMemberAction => {
        const actions = Object.assign(
          {},
          this.state.appUser.teamMembers[teamMemberId].actions || {}
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
        console.log("Couldnt save team member action: " + error)
      );
  };
  public onTodoSave = (
    teamMemberId: string,
    teamMemberTodo: ITeamMemberTodo
  ): Promise<void | ITeamMemberTodo> => {
    return saveTeamMemberTodo(
      this.state.appUser.uid,
      teamMemberId,
      teamMemberTodo
    )
      .then(savedTeamMemberTodo => {
        // const interactions = Object.assign(
        //   {},
        //   this.state.appUser.teamMembers[teamMemberId].interactions
        // );
        const todos = this.state.appUser.teamMembers[teamMemberId].todos || {};

        // if (!savedTeamMember.id) {
        //   teamMember.id = teamMember.name;
        // }
        todos[savedTeamMemberTodo.id] = savedTeamMemberTodo;

        this.setState(prevState => ({
          ...prevState,
          appUser: {
            ...prevState.appUser,
            teamMembers: {
              ...prevState.appUser.teamMembers,
              [teamMemberId]: {
                ...prevState.appUser.teamMembers[teamMemberId],
                todos: {
                  ...prevState.appUser.teamMembers[teamMemberId].todos,
                  [savedTeamMemberTodo.id]: savedTeamMemberTodo
                }
              }
            }
          }
        }));

        return Promise.resolve(savedTeamMemberTodo);
      })
      .then((x: ITeamMemberTodo) => {
        // TODO: go and compute sentiment
        return Promise.resolve(x);
      });
  };
  public onInteractionAdd = (
    teamMemberId: string,
    teamMemberInteraction: ITeamMemberInteraction
  ): Promise<void | ITeamMemberInteraction> => {
    return saveTeamMemberInteraction(
      this.state.appUser.uid,
      teamMemberId,
      teamMemberInteraction
    )
      .then(savedTeamMemberInteraction => {
        // const interactions = Object.assign(
        //   {},
        //   this.state.appUser.teamMembers[teamMemberId].interactions
        // );
        const interactions =
          this.state.appUser.teamMembers[teamMemberId].interactions || {};

        // if (!savedTeamMember.id) {
        //   teamMember.id = teamMember.name;
        // }
        interactions[
          savedTeamMemberInteraction.id
        ] = savedTeamMemberInteraction;

        this.setState(prevState => ({
          ...prevState,
          appUser: {
            ...prevState.appUser,
            teamMembers: {
              ...prevState.appUser.teamMembers,
              [teamMemberId]: {
                ...prevState.appUser.teamMembers[teamMemberId],
                interactions: {
                  ...prevState.appUser.teamMembers[teamMemberId].interactions,
                  [savedTeamMemberInteraction.id]: savedTeamMemberInteraction
                }
              }
            }
          }
        }));

        return Promise.resolve(teamMemberInteraction);
      })
      .then((interaction: ITeamMemberInteraction) => {
        // TODO: go and compute sentiment
        return Promise.resolve(interaction);
      })
      .catch((error: string) =>
        // tslint:disable-next-line:no-console
        console.log("Couldnt save team member interaction: " + error)
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
          const refVal = dataRef.val();
          let foundUser: IAppUser = new AppUser(
            refVal.displayName,
            refVal.email,
            refVal.uid,
            refVal.teamMembers
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
          <ScrollToTop>
            <HeaderMenu
              authenticated={authenticatedProp}
              displayName={this.state.appUser.firstName}
              onSignOut={this.signOutFirebase}
            />
            <Grid columns="equal" style={{ marginTop: "2em" }}>
              <Grid.Column />
              <Grid.Column width={12}>
                <Route
                  exact={true}
                  path={constants.ROUTES.LANDING}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberListPage
                          {...routeProps}
                          teamMembers={teamMembersProp}
                          isAuthenticated={authenticatedProp}
                          userDisplayName={this.state.appUser.firstName}
                          onTeamMemberAdd={this.onTeamMemberAdd}
                          onTeamMemberDelete={this.onTeamMemberDelete}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />

                <Route
                  exact={true}
                  path={constants.ROUTES.SIGN_IN}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={() => (
                    <SignInPage authenticated={authenticatedProp} />
                  )}
                />

                <Route
                  exact={true}
                  path={constants.ROUTES.HOME}
                  component={OpenListPage}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.APP_SALES}
                  component={AppSalesPage}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_ADD}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routerProps => (
                    <AddTeamMemberPage
                      {...routerProps}
                      onTeamMemberAdd={this.onTeamMemberAdd}
                    />
                  )}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_DEV_TASK_OVERVIEW}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberDevelopmentActionPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          isAuthenticated={authenticatedProp}
                          onDevelopmentTaskSave={this.onTeamMemberActionAdd}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_INTERACTION_OVERVIEW}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberInteractionsPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          isAuthenticated={authenticatedProp}
                          onInteractionSave={this.onInteractionAdd}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_TODOS_OVERVIEW}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberTodoListPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          todos={
                            (teamMembersProp[
                              (routeProps as any).match.params.id
                            ].todos || {}) as ITeamMemberTodo[]
                          }
                          isAuthenticated={authenticatedProp}
                          onToDoSave={this.onTodoSave}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_TODOS_ADD}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <AddTodoPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          onTodoSave={this.onTodoSave}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_OVERVIEW}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <TeamMemberDetailsPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          isAuthenticated={authenticatedProp}
                          onTeamMemberDelete={this.onTeamMemberDelete}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
                <Route
                  exact={true}
                  path={constants.ROUTES.TEAM_MEMBER_DEV_TASK_ADD}
                  // tslint:disable-next-line:jsx-no-lambda
                  render={routeProps => {
                    if (authenticatedProp) {
                      return (
                        <AddDevelopmentTaskPage
                          {...routeProps}
                          teamMember={
                            teamMembersProp[(routeProps as any).match.params.id]
                          }
                          onDevelopmentTaskSave={this.onTeamMemberActionAdd}
                        />
                      );
                    }
                    return <Redirect to={constants.ROUTES.SIGN_IN} />;
                  }}
                />
              </Grid.Column>
              <Grid.Column />
            </Grid>
          </ScrollToTop>
        </Router>

        <AppFooter />
      </div>
    );
  }
}

export default App;
