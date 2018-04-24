import * as React from "react";
import { Button } from "semantic-ui-react";

interface ITeamListProps {
  teamMembers: {};
  onDeleteClick: (teamMemberId: string) => void;
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
            <div key={teamMembers[element].id}>
              <Button >
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
