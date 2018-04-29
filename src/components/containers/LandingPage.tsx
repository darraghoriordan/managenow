import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Divider, Header } from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import AddTeamMemberForm from "../presentational/AddTeamMemberForm";
import TeamMemberList from "../presentational/TeamMemberList";

export interface ILandingPageProps extends RouteComponentProps<any> {
  teamMembers: {};
  isAuthenticated: boolean;
  userDisplayName: string;
  onTeamMemberDelete: (teamMemberId: string) => void;
  onTeamMemberAdd: (teamMember: ITeamMember) => void;
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
      const updatedTeamMember = (nextProps.teamMembers || {})[
        prevState.selectedTeamMember.id
      ];
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
    this.props.history.push("/team/member/" + selectedTeamMember.id);
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
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">Your Team, {this.props.userDisplayName}</Header>

        <TeamMemberList
          selectedTeamMemberId={this.state.selectedTeamMember.id}
          teamMembers={this.props.teamMembers}
          onSelectedChanged={this.onTeamMemberSelectedChanged}
          onDeleteClick={this.props.onTeamMemberDelete}
        />
        <Divider />
        <AddTeamMemberForm onTeamMemberAdd={this.props.onTeamMemberAdd} />
      </Container>
    );
  }
}

export default withRouter(LandingPage);
