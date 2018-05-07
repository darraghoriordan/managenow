import * as React from "react";
import { Card } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberListEmptyState from "./TeamMemberListEmptyState";
interface ITeamListProps {
  teamMembers: {};
  currentUserFirstName: string;
  onDeleteClick: (teamMemberId: string) => void;
  onDevTaskOverviewSelected: (teamMemberId: string) => void;
  onTeamMemberOverviewSelected: (teamMemberId: string) => void;
  onInteractionOverviewSelected: (teamMemberId: string) => void;
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
      <Card.Group itemsPerRow={3}>
        {teamMemberArray.map((tm: ITeamMember) => {
          return (
            <TeamMemberCard
              key={tm.id}
              teamMember={tm}
              onTeamMemberOverviewSelected={
                this.props.onTeamMemberOverviewSelected
              }
              onDevTaskOverviewSelected={this.props.onDevTaskOverviewSelected}
              onInteractionOverviewSelected={
                this.props.onInteractionOverviewSelected
              }
            />
          );
        })}
      </Card.Group>
    );
  }
}
