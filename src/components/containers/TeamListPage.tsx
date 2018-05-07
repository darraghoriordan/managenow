import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Divider, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import TeamMemberCardList from "../presentational/TeamMemberCardList";

export interface ITeamListPageProps extends RouteComponentProps<any> {
  teamMembers: {};
  isAuthenticated: boolean;
  userDisplayName: string;
  onTeamMemberDelete: (teamMemberId: string) => void;
  onTeamMemberAdd: (teamMember: ITeamMember) => Promise<ITeamMember>;
}
export interface ITeamListPageState {
  loading: boolean;
}
class TeamListPage extends React.PureComponent<
  ITeamListPageProps,
  ITeamListPageState
> {
  constructor(props: ITeamListPageProps) {
    super(props);

    this.onDevTaskOverviewSelected = this.onDevTaskOverviewSelected.bind(this);
    this.onTeamMemberOverviewSelected = this.onTeamMemberOverviewSelected.bind(
      this
    );
    this.onInteractionOverviewSelected = this.onInteractionOverviewSelected.bind(
      this
    );
    this.state = {
      loading: true
    };
  }

  public onDevTaskOverviewSelected(teamMemberId: string) {
    this.props.history.push(
      constants.ROUTES.TEAM_MEMBER_DEV_TASK_OVERVIEW.replace(
        ":id",
        teamMemberId
      )
    );
  }
  public onInteractionOverviewSelected(teamMemberId: string) {
    this.props.history.push(
      constants.ROUTES.TEAM_MEMBER_INTERACTION_OVERVIEW.replace(
        ":id",
        teamMemberId
      )
    );
  }

  public onTeamMemberOverviewSelected(teamMemberId: string) {
    this.props.history.push("/team/member/" + teamMemberId);
  }

  public componentDidMount() {
    if (!this.props.isAuthenticated) {
      // tslint:disable-next-line:no-console
      console.log("no auth user, redirecting to signin");
      this.props.history.push(constants.ROUTES.SIGN_IN);
    }

    this.setState({ loading: false });
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <TeamMemberCardList
          teamMembers={this.props.teamMembers}
          onTeamMemberOverviewSelected={this.onTeamMemberOverviewSelected}
          onInteractionOverviewSelected={this.onInteractionOverviewSelected}
          onDevTaskOverviewSelected={this.onDevTaskOverviewSelected}
          onDeleteClick={this.props.onTeamMemberDelete}
          currentUserFirstName={this.props.userDisplayName}
        />
        <Divider />
        <Button
          type="button"
          primary={true}
          style={{ marginBottom: "1em" }}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.history.push(constants.ROUTES.TEAM_MEMBER_ADD);
          }}
        >
          Add Team Member
          <Icon className="chevron right" />
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(TeamListPage);
