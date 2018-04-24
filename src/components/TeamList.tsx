import * as React from "react";
import { Button } from "semantic-ui-react";

interface ITeamListProps {
  teamMembers: {};
}
export default class TeamList extends React.PureComponent<ITeamListProps, any> {
  constructor(props: ITeamListProps) {
    super(props);
  }

  public render() {
    const { teamMembers } = this.props;
    if (teamMembers) {
      return (
        <div>
          <p>links to all team</p>

          {Object.keys(teamMembers).map((element: string) => (
            <Button key={teamMembers[element].id}>
              {teamMembers[element].name}{" "}
            </Button>
          ))}
        </div>
      );
    } else {
      return <p>You have no team members. Add some now!</p>;
    }
  }
}
