import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Divider, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import { TopPageNavigation } from "../presentational/TopPageNavigation";

export interface ITeamMemberDetailsProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onTeamMemberDelete: (teamMemberId: string) => void;
}
export interface ITeamMemberDetailsState {
  loading: boolean;
}
class TeamMemberDetailsPage extends React.PureComponent<
ITeamMemberDetailsProps,
ITeamMemberDetailsState
> {
  constructor(props: ITeamMemberDetailsProps) {
    super(props);

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

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember } = this.props;
    return (
      <React.Fragment>
        <TopPageNavigation history={this.props.history} />
        <Header as="h1">Details - {teamMember.name}</Header>
        This team memeber is amazing!
        <Divider />
        <Button
          type="button"
          negative={true}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.onTeamMemberDelete(teamMember.id);
            this.props.history.push(constants.ROUTES.LANDING);
          }}
        >
          <Icon className="user delete" />
          Delete {teamMember.name} (Can't be undone!)
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(TeamMemberDetailsPage);
