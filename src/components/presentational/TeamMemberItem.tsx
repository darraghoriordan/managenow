import * as React from "react";
import { Button, Icon, Item, SemanticCOLORS } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";

interface ITeamMemberItemProps {
  teamMember: ITeamMember;
  onSelectedChanged: (tamMemberId: string) => void;
}

const TeamMemberItem: React.SFC<ITeamMemberItemProps> = props => {
  const { teamMember, onSelectedChanged } = props;

  const numberOfActions = Object.keys(teamMember.actions || {}).length;
  const onSelected = onSelectedChanged;
  return (
    <Item key={teamMember.id}>
      <Icon size="huge" color={teamMember.color as SemanticCOLORS} name="snowflake outline" />
      <Item.Content>
        <Item.Header>{teamMember.name}</Item.Header>
        <Item.Meta>
          <span className="price">{"Actions: " + numberOfActions}</span>
        </Item.Meta>
        <Item.Description>
          {" "}
          <Button
            basic={true}
            color="blue"
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => {
              onSelected(teamMember.id);
            }}
          >
            {" "}
            {"Details >"}{" "}
          </Button>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default TeamMemberItem;
