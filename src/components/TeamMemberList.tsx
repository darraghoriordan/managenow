import * as React from "react";
import { Button } from "semantic-ui-react";

interface ITeamListProps {
  teamMembers: {};
  selectedTeamMemberId: string;
  onDeleteClick: (teamMemberId: string) => void;
  onSelectedChanged: (teamMemberId: string) => void;
}
export default class TeamMemberList extends React.PureComponent<ITeamListProps, any> {
  constructor(props: ITeamListProps) {
    super(props);
  }

  public render() {
    const { teamMembers } = this.props;
    if (teamMembers) {
      return (
        <div>
          {Object.keys(teamMembers).map((element: string) => (
            <div key={teamMembers[element].id}>
              <Button
                primary={
                  teamMembers[element].id === this.props.selectedTeamMemberId
                }
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {
                  this.props.onSelectedChanged(teamMembers[element].id);
                }}
              >
                {teamMembers[element].name}{" "}
              </Button>
              <Button
                negative={true}
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {
                  this.props.onDeleteClick(teamMembers[element].id);
                }}
              >
                {"delete " + teamMembers[element].name}{" "}
              </Button>
            </div>
          ))}
        </div>
      );
    } else {
      return <p>You have no team members. Add some now!</p>;
    }
  }
}
