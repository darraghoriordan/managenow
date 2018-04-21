import * as React from "react";
import { Button } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";

interface ITeamListProps {
  teamMembers: ITeamMember[];
  onTeamMemberClick: (name: string) => void;
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
          <Button
            key={element.id}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => this.props.onTeamMemberClick(element.id)}
          >
            {element.name}{" "}
          </Button>
        ))}
      </div>
    );
  }
}
