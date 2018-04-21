
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import ITeamMember from "../models/ITeamMember";
import TeamList from "./TeamList";
import TeamMemberNotes from "./TeamMemberNotes";
import TeamMemberTodos from "./TeamMemberTodos";
import TeamStatistcs from "./TeamStatistics";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: ITeamMember[];
  authUser: any;
}
export interface ILandingPageState{
  loading:boolean
}
class LandingPage extends React.PureComponent<ILandingPageProps, ILandingPageState> {
  constructor(props: ILandingPageProps) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const authCon = (authUser: any) => !!authUser;
      if (!authCon(this.props.authUser)) {
        // tslint:disable-next-line:no-console
        console.log("no auth user, redirecting to signin")
        this.props.history.push(constants.ROUTE_SIGN_IN);
      }

    this.setState({ loading: false });
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">Your Team, {this.props.authUser.displayName}</Header>
        <TeamStatistcs teamMembers={this.props.teamMembers} />
        <TeamList teamMembers={this.props.teamMembers} />
        <TeamMemberNotes teamMemberNotes={this.props.teamMembers[0].notes} />
        <TeamMemberTodos teamMemberTodos={this.props.teamMembers[0].todos} />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
