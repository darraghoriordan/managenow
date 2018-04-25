import * as React from "react";
import { Button, ButtonProps, Icon, Item } from "semantic-ui-react";
import ITeamMemberAction from "../models/ITeamMemberAction";
import ITechnique from "../models/ITechnique";
import { getTechniques } from "../services/techniqueService";

interface ITeamMemberActionListProps {
  actions: {};
  teamMemberName: string;
  onCompletedClick: (teamMemberActionId: string) => void;
}
export default class TeamMemberActionList extends React.Component<
  ITeamMemberActionListProps,
  any
> {
  constructor(props: ITeamMemberActionListProps) {
    super(props);
  }

  public render() {
    const { teamMemberName, actions } = this.props;
    if (actions) {
      return (
        <div>
          <Item.Group divided={true}>
            {Object.keys(actions).map((element: string) =>
              this.renderItem(actions[element])
            )}
          </Item.Group>
        </div>
      );
    } else {
      return <p>{teamMemberName} has no actions. Add one now!</p>;
    }
  }

  private renderItem(teamMemeberAction: ITeamMemberAction) {
    const technique =
      getTechniques().find(el => el.id === teamMemeberAction.techniqueId) ||
      ({} as ITechnique);
    return (
      <Item key={teamMemeberAction.id}>
        <Item.Content>
          <Item.Header as="a">{technique.name}</Item.Header>
          <Item.Meta>
            <span className="source">{technique.locationInSource}</span>
          </Item.Meta>
          <Item.Meta>
            <span className="status">{teamMemeberAction.status}</span>
          </Item.Meta>
          <Item.Meta>
            <span className="created">
              {"created: " + teamMemeberAction.dateAdded}
            </span>
          </Item.Meta>
          <Item.Description>{technique.description}</Item.Description>
          <Item.Extra>
            <Button
              type="button"
              primary={true}
              floated="right"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={(e: any, data: ButtonProps) => {
                this.props.onCompletedClick(teamMemeberAction.id);
              }}
            >
              Completed
              <Icon className="right chevron" />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}
