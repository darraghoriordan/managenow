import * as React from "react";
import { FirebaseAuth } from "react-firebaseui";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import constants from "../constants/constants";
import { auth, uiConfig } from "../firebase/firebase";

const SignInPage = () => (
  <Container text={true} style={{ marginTop: "7em" }}>
    <div>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  </Container>
);

class SignInForm extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public onSubmit = (event: any) => {
    return null;
  };

  public render() {
    return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
  }
}

const SignInLink = () => (
  <p>
    Don't have an account? <Link to={constants.ROUTE_SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignInPage;

export { SignInForm, SignInLink };
