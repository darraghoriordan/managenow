import { User } from "firebase";
import * as React from "react";
import AuthUserContext from "../contexts/AuthUserContext";
import { auth } from "../firebase/firebase";

interface IAuthState {
  authUser: User | null;
}
const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<any, IAuthState> {
    constructor(props: any) {
      super(props);
      const state: IAuthState = { authUser: null };

      this.state = state;
    }
    public componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    public render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
