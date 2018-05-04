import * as React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";

interface ITeamMemberCardProps {
  teamMember: ITeamMember;
  onSelectedChanged: (tamMemberId: string) => void;
}

const TeamMemberCard: React.SFC<ITeamMemberCardProps> = props => {
  const { teamMember, onSelectedChanged } = props;

  const numberOfActions = Object.keys(teamMember.actions || {}).length;
  const onSelected = onSelectedChanged;
  return (
    <Card key={teamMember.id}>
      <Image
          floated="right"
          size="tiny"
          src="/images/portraits/person-rose.jpg"
        />
      <Card.Content>      
        <Card.Header>{teamMember.name}</Card.Header>
        <Card.Meta>Tasks: {numberOfActions}</Card.Meta>
      </Card.Content>
      <Card.Content extra={true}>
        <div className="ui">
          <Button
            basic={true}
            color="blue"
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => {
              onSelected(teamMember.id);
            }}
          >
            {" "}
            {"Select " + teamMember.name}{" "}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TeamMemberCard;
