import * as React from "react";
import { FirebaseAuth } from "react-firebaseui";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { auth, uiConfig } from "../../api/firebase";
import constants from "../../constants/constants";
interface ISignInPageProps extends RouteComponentProps<any> {
  authenticated: boolean;
}
interface ISignInPageState {
  loading: boolean;
}

class SignInPage extends React.Component<ISignInPageProps, ISignInPageState> {
  constructor(props: ISignInPageProps) {
    super(props);
    this.state = {
      loading: true
    };
  }
  public componentDidMount() {
    this.setState({ loading: false });
  }

  public render() {
    if (this.props.authenticated) {
      return <Redirect to={constants.ROUTES.LANDING} />;
    }

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div style={{textAlign: "center" }}>
        <h1>Welcome! Continue with Google...</h1>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
}

export default withRouter(SignInPage);
