import * as React from "react";
import { Button } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";

export interface ITeamListProps {
  teamMembers: ITeamMember[];
}
export default class TeamList extends React.PureComponent<ITeamListProps, any> {
  constructor(props: ITeamListProps) {
    super(props);

  }

  public render() {
    return (
      <div>
        <p>links to all team</p>
        {this.props.teamMembers.map((element: ITeamMember) => (
          <Button key={element.name}>{element.name} </Button>
        ))}
      </div>
    );
  }
}
