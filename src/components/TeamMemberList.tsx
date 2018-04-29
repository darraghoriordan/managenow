import * as React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";

interface ITeamListProps {
  teamMembers: {};
  selectedTeamMemberId: string;
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
    const { teamMembers } = this.props;
    if (teamMembers) {
      return (
        <Card.Group>
          {Object.keys(teamMembers).map((element: string) => {
            const tm = teamMembers[element] as ITeamMember;
            const cardColor =
              tm.id === this.props.selectedTeamMemberId ? "red" : "grey";
            const numberOfActions = Object.keys(tm.actions || {}).length;
            const daysSinceInteraction = Math.floor(Math.random() * 10);
            return (
              <Card key={tm.id} color={cardColor}>
                <Card.Content>
                  <Image
                    floated="right"
                    size="tiny"
                    src="/images/portraits/person-rose.jpg"
                  />
                  <Card.Header>{tm.name}</Card.Header>
                  <Card.Meta>Actions: {numberOfActions}</Card.Meta>
                  <Card.Description>
                    It's been {daysSinceInteraction} days since your last
                    interaction!
                  </Card.Description>
                </Card.Content>
                <Card.Content extra={true}>
                  <div className="ui two buttons">
                    <Button
                      basic={true}
                      color="blue"
                      // tslint:disable-next-line:jsx-no-lambda
                      onClick={() => {
                        this.props.onSelectedChanged(teamMembers[element].id);
                      }}
                    >
                      {" "}
                      {"Select " + teamMembers[element].name}{" "}
                    </Button>
                    {/* <Button
                      basic={true}
                      color="red"
                      // tslint:disable-next-line:jsx-no-lambda
                      onClick={() => {
                        this.props.onDeleteClick(teamMembers[element].id);
                      }}
                    >
                      {" "}
                      {"delete " + teamMembers[element].name}{" "}
                    </Button> */}
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      );
    } else {
      return <p>You have no team members. Add some now!</p>;
    }
  }
}
