import * as React from "react";
import { Button, Card, Icon, SemanticCOLORS } from "semantic-ui-react";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";

interface ITeamMemberCardProps {
  teamMember: ITeamMember;
  onTeamMemberOverviewSelected: (teamMemberId: string) => void;
  onDevTaskOverviewSelected: (teamMemberId: string) => void;
}

const TeamMemberCard: React.SFC<ITeamMemberCardProps> = props => {
  const { teamMember, onDevTaskOverviewSelected, onTeamMemberOverviewSelected } = props;

  const numberOfActions = Object.keys(teamMember.actions || {})
    .map(
      (actionId: string) => teamMember.actions[actionId] as ITeamMemberAction
    )
    .filter(
      (action: ITeamMemberAction) =>
        action.status === TeamMemberActionStatus.active
    ).length;
  const numberOfActionsStyles = numberOfActions <= 0 ? { color: "red" } : {};
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
              {" "}
              {"Overview for " + teamMember.name}{" "}
            </Button>
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra={true}>
        <a 
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          onDevTaskOverviewSelected(teamMember.id);
        }}>
          <span style={numberOfActionsStyles}>
            <Icon name="flask" />
            <span style={{ textDecoration: "underline" }}>
              {numberOfActions} Active Devlopment Tasks{" "}
            </span>
          </span>
        </a>

      </Card.Content>
    </Card>
  );
};

export default TeamMemberCard;
