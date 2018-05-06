import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Feed, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberInteraction from "../../models/ITeamMemberInteractions";
import AddTeamMemberInteractionForm from "../presentational/AddTeamMemberInteractionForm";

export interface IInteractionsPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onInteractionSave: (
    teamMemberId: string,
    teamMemberInteraction: ITeamMemberInteraction
  ) => Promise<void | ITeamMemberInteraction>;
}
export interface IInteractionsPageState {
  loading: boolean;
}
class InteractionsPage extends React.PureComponent<
  IInteractionsPageProps,
  IInteractionsPageState
> {
  constructor(props: IInteractionsPageProps) {
    super(props);
    this.onTeamMemberInteractionSave = this.onTeamMemberInteractionSave.bind(
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
  public onTeamMemberInteractionSave(
    teamMemberId: string,
    interaction: ITeamMemberInteraction
  ): Promise<void | ITeamMemberInteraction> {
    return this.props.onInteractionSave(this.props.teamMember.id, interaction);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember } = this.props;

    const interactions = Object.keys(teamMember.interactions || {})
      .map(
        (key: string) => teamMember.interactions[key] as ITeamMemberInteraction
      )
      .sort(
        (a: ITeamMemberInteraction, b: ITeamMemberInteraction) =>
          b.dateAdded - a.dateAdded
      );

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
        <Header as="h1">Interactions - {teamMember.name}</Header>
        <Button
          type="button"
          primary={true}
          style={{ marginBottom: "1em" }}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.history.push(
              constants.ROUTES.TEAM_MEMBER_INTERACTION_ADD.replace(
                ":id",
                teamMember.id
              )
            );
          }}
        >
          Add Interaction
          <Icon className="chevron right" />
        </Button>
        <AddTeamMemberInteractionForm
          onTeamMemberInteractionAdd={this.onTeamMemberInteractionSave}
          selectedTeamMember={this.props.teamMember}
        />
        {interactions.length > 0 && (
          <Feed>
            {interactions.map((i: ITeamMemberInteraction) => (
              <Feed.Event
                icon="pencil"
                date={i.dateAdded}
                summary={i.description}
              />
            ))}
          </Feed>
        )}
      </div>
    );
  }
}

export default withRouter(InteractionsPage);
