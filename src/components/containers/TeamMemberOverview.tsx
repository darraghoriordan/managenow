import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Divider, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";

export interface ITeamMemberOverviewProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onTeamMemberDelete: (teamMemberId: string) => void;
}
export interface ITeamMemberOverviewState {
  loading: boolean;
}
class TeamMemberOverviewPage extends React.PureComponent<
  ITeamMemberOverviewProps,
  ITeamMemberOverviewState
> {
  constructor(props: ITeamMemberOverviewProps) {
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
      </div>
    );
  }
}

export default withRouter(TeamMemberOverviewPage);
