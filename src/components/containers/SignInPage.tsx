import * as React from "react";
import { FirebaseAuth } from "react-firebaseui";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import constants from "../../constants/constants";
import { auth, uiConfig } from "../../firebase/firebase";
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
      return <Redirect to={constants.ROUTE_LANDING} />;
    }

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div  style={{ marginTop: "7em" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Welcome!</h1>
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);
