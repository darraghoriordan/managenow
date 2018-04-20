import { User } from "firebase";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import { auth } from "../firebase/firebase";
import ITeamMember from "../models/ITeamMember";
import TeamList from "./TeamList";
import TeamMemberNotes from "./TeamMemberNotes";
import TeamMemberTodos from "./TeamMemberTodos";
import TeamStatistcs from "./TeamStatistics";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: ITeamMember[];
  authUser: any;
}

class LandingPage extends React.PureComponent<ILandingPageProps, any> {
  constructor(props: ILandingPageProps) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const authCon = (authUser: any) => !!this.props.authUser;
    auth.onAuthStateChanged((authUser: User) => {
      if (!authCon(authUser)) {
        this.props.history.push(constants.ROUTE_SIGN_IN);
      }
    });
    this.state = {
      loading: false
    };
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">Your Team</Header>
        <TeamStatistcs teamMembers={this.props.teamMembers} />
        <TeamList teamMembers={this.props.teamMembers} />
        <TeamMemberNotes teamMemberNotes={this.props.teamMembers[0].notes} />
        <TeamMemberTodos teamMemberTodos={this.props.teamMembers[0].todos} />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
