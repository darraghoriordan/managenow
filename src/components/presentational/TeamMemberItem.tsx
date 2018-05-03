import * as React from "react";
import { Button, Item } from "semantic-ui-react";
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
      <Item.Image size="tiny" src="/images/portraits/person-rose.jpg" />
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
