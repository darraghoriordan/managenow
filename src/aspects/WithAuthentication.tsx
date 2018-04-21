import { User } from "firebase";
import * as React from "react";
import { auth } from "../firebase/firebase";

export interface IAuthState {
  authUser: User | null;
  authenticated: boolean;
}
const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<any, IAuthState> {
    constructor(props: any) {
      super(props);
      const state: IAuthState = { authUser: null, authenticated: false };

      this.state = state;
    }
    public componentDidMount() {
      // if (!authCon(authUser)) {
      //   this.props.history.push(constants.ROUTE_SIGN_IN);
      // }
      //  const authCon = (authUser: any) => !!this.props.authUser;
      auth.onAuthStateChanged((authUser: User) => {
        if (authUser) {
          this.setState({
            authUser,
            authenticated: true
          });
        } else {
          this.setState({
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
