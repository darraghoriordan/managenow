import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import { TeamMemberStatus } from "../models/Enums";
import ITeamMember from "../models/ITeamMember";
import TeamList from "./TeamList";
import TeamMemberActions from "./TeamMemberActions";
import TeamMemberNotes from "./TeamMemberNotes";
import TeamMemberTodos from "./TeamMemberTodos";
import TeamStatistcs from "./TeamStatistics";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: ITeamMember[];
  authUser: any;
}
export interface ILandingPageState {
  loading: boolean;
  activeTeamMember: ITeamMember;
}
class LandingPage extends React.PureComponent<
  ILandingPageProps,
  ILandingPageState
> {
  constructor(props: ILandingPageProps) {
    super(props);

    this.onTeamMemberClick = this.onTeamMemberClick.bind(this);
    this.state = {
      activeTeamMember: this.props.teamMembers[0],
      loading: true
    };
  }

  public componentDidMount() {
    const authCon = (authUser: any) => !!authUser;
    if (!authCon(this.props.authUser)) {
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
        <Header as="h1">Your Team, {this.props.authUser.displayName}</Header>
        <TeamStatistcs teamMembers={this.props.teamMembers} />
        <TeamList
          teamMembers={this.props.teamMembers}
          onTeamMemberClick={this.onTeamMemberClick}
        />
        <TeamMemberActions teamMemberActions={this.state.activeTeamMember.actions} />
        <TeamMemberNotes teamMemberNotes={this.state.activeTeamMember.notes} />
        <TeamMemberTodos teamMemberTodos={this.state.activeTeamMember.todos} />
      </Container>
    );
  }

  private onTeamMemberClick(id: string) {
    const emptyTeamMember:ITeamMember = {
      actions: [],
      id: "",
      name: "",
      notes: [ ],
      status: TeamMemberStatus.active,
      todos: []
    }
    const foundMember: ITeamMember | undefined = this.props.teamMembers.find(
      tm => tm.id === id
    );
    this.setState({ activeTeamMember: (foundMember || emptyTeamMember)});
  }
}

export default withRouter(LandingPage);
