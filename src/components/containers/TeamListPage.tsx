import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Divider, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import TeamMemberList from "../presentational/TeamMemberList";

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

    this.onTeamMemberSelectedChanged = this.onTeamMemberSelectedChanged.bind(
      this
    );

    this.state = {
      loading: true
    };
  }

  public onTeamMemberSelectedChanged(teamMemberId: string) {
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
      <div style={{ marginTop: "7em" }}>
        <TeamMemberList
          teamMembers={this.props.teamMembers}
          onSelectedChanged={this.onTeamMemberSelectedChanged}
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
      </div>
    );
  }
}

export default withRouter(TeamListPage);
