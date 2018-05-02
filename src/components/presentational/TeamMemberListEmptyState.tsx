import * as React from "react";
import { Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";

interface ITeamMemberListEmptyStateProps {
  firstName: string;
}

const TeamMemberListEmptyState: React.SFC<ITeamMemberListEmptyStateProps> = props => {
  const { firstName } = props;

  const divStyle:React.CSSProperties = {textAlign: `center`};
  return (
     <div style={divStyle}>
    <Icon size="huge" name="user outline" />
    <Header as="h1">Welcome to {constants.APP_NAME}</Header>
    <Header as="h2">Hi {firstName}, you are about to take your team to the next level. Let's get started by adding your first team member.…</Header>
</div>
  )
}

export default TeamMemberListEmptyState;