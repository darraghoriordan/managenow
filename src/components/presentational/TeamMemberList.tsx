import * as React from "react";
import { Item } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";
import TeamMemberItem from "./TeamMemberItem";
import TeamMemberListEmptyState from "./TeamMemberListEmptyState";
interface ITeamListProps {
  teamMembers: {};
  currentUserFirstName: string;
  onDeleteClick: (teamMemberId: string) => void;
  onSelectedChanged: (teamMemberId: string) => void;
}
export default class TeamMemberList extends React.PureComponent<
  ITeamListProps,
  any
> {
  constructor(props: ITeamListProps) {
    super(props);
  }

  public render() {
    const { teamMembers, currentUserFirstName } = this.props;
    if (!teamMembers) {
      return <TeamMemberListEmptyState firstName={currentUserFirstName} />;
    }

    const teamMemberArray = Object.keys(teamMembers).map(
      (element: string) => teamMembers[element] as ITeamMember
    );
    if (teamMemberArray.length === 0) {
      return <TeamMemberListEmptyState firstName={currentUserFirstName} />;
    }
    return (
      <Item.Group>
        {teamMemberArray.map((tm: ITeamMember) => {
          return (
            <TeamMemberItem
              key={tm.id}
              teamMember={tm}
              onSelectedChanged={this.props.onSelectedChanged}
            />
          );
        })}
      </Item.Group>
    );
  }
}
