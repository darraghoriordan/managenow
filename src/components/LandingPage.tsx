import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import { TeamMemberActionStatus, TeamMemberStatus } from "../models/Enums";
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
  onTeamMemberActionSave: (
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
        (nextProps.teamMembers ||{})[prevState.selectedTeamMember.id];
      // is there an updated active team member?
      if (
        updatedTeamMember &&
        updatedTeamMember.status === TeamMemberStatus.active
      ) {
        return { selectedTeamMember: updatedTeamMember };
      }
      // is there an availabl next team member?
      const nextTeamMember = LandingPage.findNextValidTeamMember(
        nextProps.teamMembers
      );
      if (nextTeamMember) {
        return { selectedTeamMember: nextTeamMember };
      }
    }
    return { selectTeamMember: null };
  }
  public static findNextValidTeamMember(teamMembers: any): ITeamMember {
    if (!teamMembers) {
      return {} as ITeamMember;
    }
    const foundTeamMmber = Object.keys(teamMembers)
      .map((x: string) => teamMembers[x])
      .filter(x => x.status === TeamMemberStatus.active)[0];
    return foundTeamMmber || ({} as ITeamMember);
  }
  constructor(props: ILandingPageProps) {
    super(props);

    this.onTeamMemberSelectedChanged = this.onTeamMemberSelectedChanged.bind(
      this
    );
    this.onTeamMemberActionSaveNotes = this.onTeamMemberActionSaveNotes.bind(
      this
    );
    this.onTeamMemberActionComplete = this.onTeamMemberActionComplete.bind(
      this
    );

    const selectedTeamMember = LandingPage.findNextValidTeamMember(
      this.props.teamMembers
    );

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

    this.props.onTeamMemberActionSave(this.state.selectedTeamMember.id, action);
  }
  public onTeamMemberActionSaveNotes(
    teamMemberActionId: string,
    notes: string
  ) {
    const action = Object.assign(
      {},
      this.state.selectedTeamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.notes = notes;

    this.props.onTeamMemberActionSave(this.state.selectedTeamMember.id, action);
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
          onSaveNotesClick={this.onTeamMemberActionSaveNotes}
        />
        <AddTeamMemberAction
          selectedTeamMember={this.state.selectedTeamMember}
          onSelection={this.props.onTeamMemberActionSave}
        />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
