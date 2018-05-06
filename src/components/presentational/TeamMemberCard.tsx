import { differenceInCalendarDays, subDays } from "date-fns";
import * as React from "react";
import { Button, Card, Icon, SemanticCOLORS } from "semantic-ui-react";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import ITeamMemberInteraction from "../../models/ITeamMemberInteractions";

interface ITeamMemberCardProps {
  teamMember: ITeamMember;
  onTeamMemberOverviewSelected: (teamMemberId: string) => void;
  onDevTaskOverviewSelected: (teamMemberId: string) => void;
  onInteractionOverviewSelected: (teamMemberId: string) => void;
}

const TeamMemberCard: React.SFC<ITeamMemberCardProps> = props => {
  const {
    teamMember,
    onDevTaskOverviewSelected,
    onTeamMemberOverviewSelected,
    onInteractionOverviewSelected
  } = props;

  const numberOfActions = Object.keys(teamMember.actions || {})
    .map(
      (actionId: string) => teamMember.actions[actionId] as ITeamMemberAction
    )
    .filter(
      (action: ITeamMemberAction) =>
        action.status === TeamMemberActionStatus.active
    ).length;
  const numberOfActionsStyles = numberOfActions <= 0 ? { color: "red" } : {};

  const pulses = Object.keys(teamMember.interactions || {}).map(
    (pulseId: string) =>
      teamMember.interactions[pulseId] as ITeamMemberInteraction
  );
  const nearestInteraction = Math.max(
    ...pulses.map(interaction => interaction.dateAdded)
  );
  const today = new Date();
  const niDate = new Date(
    nearestInteraction > 0 ? nearestInteraction : subDays(today, 2)
  );

  const daysSinceInteraction = differenceInCalendarDays(today, niDate);

  const daysSinceInteractionStyles =
    daysSinceInteraction >= 2 ? { color: "red" } : {};

  const cardIconStyle = {
    marginBottom: "0.3em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0.3em"
  };
  return (
    <Card key={teamMember.id}>
      <Icon
        style={cardIconStyle}
        size="massive"
        color={teamMember.color as SemanticCOLORS}
        name="snowflake outline"
      />
      <Card.Content>
        <Card.Header>{teamMember.name}</Card.Header>
        <Card.Meta>
          <span className="date">
            Improving since{" "}
            {teamMember.createdDate
              ? new Date(teamMember.createdDate).getFullYear()
              : new Date().getFullYear()}
          </span>
        </Card.Meta>
        <Card.Description>
          <div className="ui">
            <Button
              basic={true}
              color="blue"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => {
                onTeamMemberOverviewSelected(teamMember.id);
              }}
            >
              {"Go to overview "}
              <Icon name="chevron right" />
            </Button>
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra={true}>
        <a
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => {
            onDevTaskOverviewSelected(teamMember.id);
          }}
        >
          <span style={numberOfActionsStyles}>
            <Icon name="flask" />
            <span style={{ textDecoration: "underline" }}>
              {numberOfActions} Active Devlopment Tasks{" "}
            </span>
          </span>
        </a>
        <br />
        <a
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => {
            onInteractionOverviewSelected(teamMember.id);
          }}
        >
          <span style={daysSinceInteractionStyles}>
            <Icon name="line graph" />
            <span style={{ textDecoration: "underline" }}>
              {daysSinceInteraction} Days since last interaction{" "}
            </span>
          </span>
        </a>
      </Card.Content>
    </Card>
  );
};

export default TeamMemberCard;
