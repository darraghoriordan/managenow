import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import ITeamMember from "../models/ITeamMember";
import AddTeamMemberForm from "./AddTeamMember";
import TeamList from "./TeamList";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: {};
  isAuthenticated: boolean;
  userDisplayName: string;
  onAddTeamMember: (teamMember: ITeamMember) => void;
}
export interface ILandingPageState {
  loading: boolean;
}
class LandingPage extends React.PureComponent<
  ILandingPageProps,
  ILandingPageState
> {
  constructor(props: ILandingPageProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    if (!this.props.isAuthenticated) {
      // tslint:disable-next-line:no-console
      console.log("no auth user, redirecting to signin");
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
        <Header as="h1">Your Team, {this.props.userDisplayName}</Header>
        <TeamList teamMembers={this.props.teamMembers} />
        <AddTeamMemberForm addTeamMember={this.props.onAddTeamMember} />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
