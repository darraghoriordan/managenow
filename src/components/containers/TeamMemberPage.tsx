import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Button,
  ButtonProps,
  Header,
  Icon
} from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import { getTechniques } from "../../services/techniqueService";
import AddTeamMemberAction from "../presentational/AddTeamMemberAction";
import TeamMemberActionList from "../presentational/TeamMemberActionList";

export interface ITeamMemberPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
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
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.status = TeamMemberActionStatus.done;

    this.props.onTeamMemberActionSave(this.props.teamMember.id, action);
  }
  public onTeamMemberActionSaveNotes(
    teamMemberActionId: string,
    notes: string
  ) {
    const action = Object.assign(
      {},
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.notes = notes;

    this.props.onTeamMemberActionSave(this.props.teamMember.id, action);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember, onTeamMemberActionSave } = this.props;
    return (
      <div style={{ marginTop: "7em" }}>
        <Header as="h1">{teamMember.name}</Header>
        <TeamMemberActionList
          teamMemberName={teamMember.name}
          actions={teamMember.actions}
          techniques={getTechniques()}
          onCompletedClick={this.onTeamMemberActionComplete}
          onSaveNotesClick={this.onTeamMemberActionSaveNotes}
        />
        <AddTeamMemberAction
          selectedTeamMember={teamMember}
          onSelection={onTeamMemberActionSave}
        />
        <Button
          type="button"
          negative={true}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.onTeamMemberDelete(teamMember.id);
            this.props.history.push(constants.ROUTE_LANDING);
          }}
        >
          <Icon className="user delete" />
          Delete User
        </Button>
      </div>
    );
  }
}

export default withRouter(TeamMemberPage);
