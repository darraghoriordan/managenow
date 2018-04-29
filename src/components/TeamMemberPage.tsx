import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import constants from "../constants/constants";
import { TeamMemberActionStatus } from "../models/Enums";
import ITeamMember from "../models/ITeamMember";
import ITeamMemberAction from "../models/ITeamMemberAction";
import AddTeamMemberAction from "./AddTeamMemberAction";
import TeamMemberActionList from "./TeamMemberActionList";

export interface ITeamMemberPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  selectedTeamMember: ITeamMember;
  onTeamMemberDelete: (teamMemberId: string) => void;
  onTeamMemberActionSave: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) => void;
}
export interface ITeamMemberPageState {
  loading: boolean;
}
class TeamMemberPage extends React.PureComponent<
  ITeamMemberPageProps,
  ITeamMemberPageState
> {
  constructor(props: ITeamMemberPageProps) {
    super(props);

    this.onTeamMemberActionSaveNotes = this.onTeamMemberActionSaveNotes.bind(
      this
    );
    this.onTeamMemberActionComplete = this.onTeamMemberActionComplete.bind(
      this
    );

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
  public onTeamMemberActionComplete(teamMemberActionId: string) {
    const action = Object.assign(
      {},
      this.props.selectedTeamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.status = TeamMemberActionStatus.done;

    this.props.onTeamMemberActionSave(this.props.selectedTeamMember.id, action);
  }
  public onTeamMemberActionSaveNotes(
    teamMemberActionId: string,
    notes: string
  ) {
    const action = Object.assign(
      {},
      this.props.selectedTeamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.notes = notes;

    this.props.onTeamMemberActionSave(this.props.selectedTeamMember.id, action);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">{this.props.selectedTeamMember.name}</Header>
        <TeamMemberActionList
          teamMemberName={this.props.selectedTeamMember.name}
          actions={this.props.selectedTeamMember.actions}
          onCompletedClick={this.onTeamMemberActionComplete}
          onSaveNotesClick={this.onTeamMemberActionSaveNotes}
        />
        <AddTeamMemberAction
          selectedTeamMember={this.props.selectedTeamMember}
          onSelection={this.props.onTeamMemberActionSave}
        />
      </Container>
    );
  }
}

export default withRouter(TeamMemberPage);
