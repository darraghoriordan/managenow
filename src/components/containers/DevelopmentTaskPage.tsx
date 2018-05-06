import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import { getTechniques } from "../../services/techniqueService";
import TeamMemberActionList from "../presentational/TeamMemberActionList";

export interface IDevelopmentTaskPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onDevelopmentTaskSave: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) => void;
}
export interface IDevelopmentTaskPageState {
  loading: boolean;
}
class DevelopmentTaskPage extends React.PureComponent<
  IDevelopmentTaskPageProps,
  IDevelopmentTaskPageState
> {
  constructor(props: IDevelopmentTaskPageProps) {
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
      this.props.history.push(constants.ROUTES.SIGN_IN);
    }

    this.setState({ loading: false });
  }
  public onTeamMemberActionComplete(teamMemberActionId: string, notes:string) {
    const action = Object.assign(
      {},
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.status = TeamMemberActionStatus.done;

    action.notes = notes || "";
    this.props.onDevelopmentTaskSave(this.props.teamMember.id, action);
  }
  public onTeamMemberActionSaveNotes(
    teamMemberActionId: string,
    notes: string
  ) {
    const action = Object.assign(
      {},
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberAction;
    action.notes = notes = notes || "";

    this.props.onDevelopmentTaskSave(this.props.teamMember.id, action);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember } = this.props;
    return (
      <div style={{ marginTop: "7em" }}>
        <Button
      type="button"
      primary={true}
      style={{ marginBottom: "1em" }}
      // tslint:disable-next-line:jsx-no-lambda
      onClick={(e: any, data: ButtonProps) => {
        this.props.history.goBack();
      }}
    >
      <Icon className="chevron left" />
      Back
    </Button>
        <Header as="h1">Details - {teamMember.name}</Header>
        <Button
          type="button"
          primary={true}
          style={{ marginBottom: "1em" }}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.history.push(
              constants.ROUTES.TEAM_MEMBER_DEV_TASK_ADD.replace(
                ":id",
                teamMember.id
              )
            );
          }}
        >
          Add Development Task
          <Icon className="chevron right" />
        </Button>
        <TeamMemberActionList
          teamMemberName={teamMember.name}
          actions={teamMember.actions}
          techniques={getTechniques()}
          onCompletedClick={this.onTeamMemberActionComplete}
          onSaveNotesClick={this.onTeamMemberActionSaveNotes}
        />
      </div>
    );
  }
}

export default withRouter(DevelopmentTaskPage);
