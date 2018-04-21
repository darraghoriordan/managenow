import { User } from "firebase";
import * as React from "react";
import { doCreateUser, onceGetUser } from "../firebase/db";
import { auth } from "../firebase/firebase";
import IAppUser from "../models/IAppUser";

export interface IAuthState {
  authUser: User | null;
  authenticated: boolean;
  appUser: IAppUser | null;
}
const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<any, IAuthState> {
    constructor(props: any) {
      super(props);
      const state: IAuthState = {
        appUser: null,
        authUser: null,
        authenticated: false
      };

      this.state = state;
    }
    public componentDidMount() {
      // if (!authCon(authUser)) {
      //   this.props.history.push(constants.ROUTE_SIGN_IN);
      // }
      //  const authCon = (authUser: any) => !!this.props.authUser;
      auth.onAuthStateChanged((authUser: User) => {
        if (authUser) {
          // try get the appUser
          onceGetUser(authUser.uid)
            .then(dataRef => {
              // if not exists  create the new user
              let foundUser = dataRef.val();

              if (!foundUser) {
                foundUser={
                  displayName: authUser.displayName || "",
                  email: authUser.email || "",
                  uid:authUser.uid
                }
                doCreateUser(
                  authUser.uid,
                  authUser.email || "",
                  authUser.displayName || ""
                );
              }
              this.setState({
                appUser: foundUser,
                authUser,
                authenticated: true
              });
            })
            .catch(
              
              error => {
                // tslint:disable-next-line:no-console
                console.log(error);
              }
            );
        } else {
          this.setState({
            appUser: null,
            authUser: null,
            authenticated: false
          });
        }
      });
    }

    public render() {
      const { authUser, authenticated } = this.state;
      return <Component authUser={authUser} authenticated={authenticated} />;
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
