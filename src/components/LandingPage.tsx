import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import { TeamMemberActionStatus } from "../models/Enums";
import ITeamMember from "../models/ITeamMember";
import ITeamMemberAction from "../models/ITeamMemberAction";
import AddTeamMemberAction from "./AddTeamMemberAction";
import AddTeamMemberForm from "./AddTeamMemberForm";
import TeamMemberActionList from "./TeamMemberActionList";
import TeamMemberList from "./TeamMemberList";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: {};
  isAuthenticated: boolean;
  userDisplayName: string;
  onTeamMemberDelete: (teamMemberId: string) => void;
  onTeamMemberAdd: (teamMember: ITeamMember) => void;
  onTeamMemberActionAdd: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) => void;
}
export interface ILandingPageState {
  loading: boolean;
  selectedTeamMember: ITeamMember;
}
class LandingPage extends React.PureComponent<
  ILandingPageProps,
  ILandingPageState
> {
  public static getDerivedStateFromProps(
    nextProps: ILandingPageProps,
    prevState: ILandingPageState
  ) {
    if (prevState.selectedTeamMember) {
      const updatedTeamMember =
        nextProps.teamMembers[prevState.selectedTeamMember.id];
      if (updatedTeamMember) {
        return { selectedTeamMember: updatedTeamMember };
      }
    }
    return null;
  }

  constructor(props: ILandingPageProps) {
    super(props);

    this.onTeamMemberSelectedChanged = this.onTeamMemberSelectedChanged.bind(
      this
    );
    this.onTeamMemberActionComplete = this.onTeamMemberActionComplete.bind(
      this
    );
    let selectedTeamMember = {} as ITeamMember;
    if (Object.keys(this.props.teamMembers).length > 0) {
      selectedTeamMember = this.props.teamMembers[
        Object.keys(this.props.teamMembers)[0]
      ];
    }
    this.state = {
      loading: true,
      selectedTeamMember
    };
  }

  public onTeamMemberSelectedChanged(teamMemberId: string) {
    const selectedTeamMember = this.props.teamMembers[teamMemberId];
    this.setState({ selectedTeamMember });
  }

  public componentDidMount() {
    if (!this.props.isAuthenticated) {
      // tslint:disable-next-line:no-console
      console.log("no auth user, redirecting to signin");
      this.props.history.push(constants.ROUTE_SIGN_IN);
    }

    this.setState({ loading: false });
  }
  public onTeamMemberActionComplete(teamMemberActionId: string) {
    const action = Object.assign(
      {},
      this.state.selectedTeamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.status = TeamMemberActionStatus.done;

    this.props.onTeamMemberActionAdd(this.state.selectedTeamMember.id, action);
  }
  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">Your Team, {this.props.userDisplayName}</Header>

        <TeamMemberList
          selectedTeamMemberId={this.state.selectedTeamMember.id}
          teamMembers={this.props.teamMembers}
          onSelectedChanged={this.onTeamMemberSelectedChanged}
          onDeleteClick={this.props.onTeamMemberDelete}
        />

        <AddTeamMemberForm onTeamMemberAdd={this.props.onTeamMemberAdd} />
        <TeamMemberActionList
          teamMemberName={this.state.selectedTeamMember.name}
          actions={this.state.selectedTeamMember.actions}
          onCompletedClick={this.onTeamMemberActionComplete}
        />
        <AddTeamMemberAction
          selectedTeamMember={this.state.selectedTeamMember}
          onSelection={this.props.onTeamMemberActionAdd}
        />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
