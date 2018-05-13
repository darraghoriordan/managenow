import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberDevelopmentActionStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberDevelopmentAction from "../../models/ITeamMemberDevelopmentAction";
import { getTechniques } from "../../services/techniqueService";
import TeamMemberDevelopmentTaskList from "../presentational/TeamMemberDevelopmentTaskList";
import { TopPageNavigation } from "../presentational/TopPageNavigation";

export interface IDevelopmentTaskPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onDevelopmentTaskSave: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberDevelopmentAction
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
  public onTeamMemberActionComplete(teamMemberActionId: string, notes: string) {
    const action = Object.assign(
      {},
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberDevelopmentAction;
    action.notes  = notes || "";
    action.status = TeamMemberDevelopmentActionStatus.done;
    action.dateCompleted = new Date().getTime();
    this.props.onDevelopmentTaskSave(this.props.teamMember.id, action);
  }
  public onTeamMemberActionSaveNotes(
    teamMemberActionId: string,
    notes: string
  ) {
    const action = Object.assign(
      {},
      this.props.teamMember.actions[teamMemberActionId]
    ) as ITeamMemberDevelopmentAction;
    action.notes  = notes || "";

    this.props.onDevelopmentTaskSave(this.props.teamMember.id, action);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember } = this.props;
    return (
      <React.Fragment>
        <TopPageNavigation history={this.props.history} />
        <Header as="h1">Development Tasks - {teamMember.name}</Header>
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
        <TeamMemberDevelopmentTaskList
          teamMemberName={teamMember.name}
          actions={teamMember.actions}
          techniques={getTechniques()}
          onCompletedClick={this.onTeamMemberActionComplete}
          onSaveNotesClick={this.onTeamMemberActionSaveNotes}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(DevelopmentTaskPage);
