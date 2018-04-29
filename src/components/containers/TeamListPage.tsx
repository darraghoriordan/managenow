import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Divider, Header } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import AddTeamMemberForm from "../presentational/AddTeamMemberForm";
import TeamMemberList from "../presentational/TeamMemberList";

export interface ITeamListPageProps extends RouteComponentProps<any> {
  teamMembers: {};
  isAuthenticated: boolean;
  userDisplayName: string;
  onTeamMemberDelete: (teamMemberId: string) => void;
  onTeamMemberAdd: (teamMember: ITeamMember) => void;
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
      this.props.history.push(constants.ROUTE_SIGN_IN);
    }

    this.setState({ loading: false });
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <div>
    
        <Header as="h1">Your Team, {this.props.userDisplayName}</Header>

        <TeamMemberList
          teamMembers={this.props.teamMembers}
          onSelectedChanged={this.onTeamMemberSelectedChanged}
          onDeleteClick={this.props.onTeamMemberDelete}
        />
        <Divider />
        <AddTeamMemberForm onTeamMemberAdd={this.props.onTeamMemberAdd} />
  
      </div>
    );
  }
}

export default withRouter(TeamListPage);
