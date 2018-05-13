import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Divider, Feed, Header } from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberInteractionSentiment } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberInteraction from "../../models/ITeamMemberInteractions";
import AddTeamMemberInteractionForm from "../presentational/AddTeamMemberInteractionForm";
import { TopPageNavigation } from "../presentational/TopPageNavigation";

export interface ITeamMemberInteractionsPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  onInteractionSave: (
    teamMemberId: string,
    teamMemberInteraction: ITeamMemberInteraction
  ) => Promise<void | ITeamMemberInteraction>;
}
export interface ITeamMemberInteractionsPageState {
  loading: boolean;
}
class TeamMemberInteractionsPage extends React.PureComponent<
  ITeamMemberInteractionsPageProps,
  ITeamMemberInteractionsPageState
> {
  constructor(props: ITeamMemberInteractionsPageProps) {
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

  public mapSentimentToIcon(sentiment: TeamMemberInteractionSentiment): string {
    if (sentiment === TeamMemberInteractionSentiment.negative) {
      return "thumbs down";
    }
    if (sentiment === TeamMemberInteractionSentiment.positive) {
      return "thumbs up";
    }

    return "window minimize";
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
      <React.Fragment>
        <TopPageNavigation history={this.props.history} />
        <Header as="h1">Interactions - {teamMember.name}</Header>

        <AddTeamMemberInteractionForm
          onTeamMemberInteractionAdd={this.onTeamMemberInteractionSave}
          selectedTeamMember={this.props.teamMember}
        />
        <Divider />
        {interactions.length > 0 && (
          <div>
            <Header as="h2">Past Interactions</Header>
            <Feed>
              {interactions.map((i: ITeamMemberInteraction) => {
                const interactionSentiment =
                  i.manualSentiment || i.computedSentiment;

                return (
                  <Feed.Event
                    key={i.id}
                    icon={this.mapSentimentToIcon(interactionSentiment)}
                    date={distanceInWordsToNow(i.dateAdded) + " ago"}
                    extraText={i.description}
                  />
                );
              })}
            </Feed>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(TeamMemberInteractionsPage);
