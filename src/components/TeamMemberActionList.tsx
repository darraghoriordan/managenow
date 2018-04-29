import * as React from "react";
import {
  Button,
  ButtonProps,
  Form,
  Header,
  Icon,
  Item,
  TextArea
} from "semantic-ui-react";
import { TeamMemberActionStatus } from "../models/Enums";
import ITeamMemberAction from "../models/ITeamMemberAction";
import ITechnique from "../models/ITechnique";
import { getTechniques } from "../services/techniqueService";

interface ITeamMemberActionListProps {
  actions: {};
  teamMemberName: string;
  onCompletedClick: (teamMemberActionId: string) => void;
  onSaveNotesClick: (teamMemberActionId: string, notes: string) => void;
}

export default class TeamMemberActionList extends React.Component<
  ITeamMemberActionListProps,
  any
> {
  public static getDerivedStateFromProps(
    nextProps: ITeamMemberActionListProps,
    prevState: any
  ) {
    const notes = Object.keys(nextProps.actions || {}).reduce<{}>(
      (prev: {}, curr: string, i: number) => {
        prev[TeamMemberActionList.getNoteFieldName(curr)] =
          nextProps.actions[curr].notes;
        return prev;
      },
      {}
    );

    return { ...notes };
  }
  public static getNoteFieldName(actionId: string): string {
    return actionId + "-notes";
  }
  constructor(props: ITeamMemberActionListProps) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.state = {};
  }

  public handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });

  public render() {
    const { teamMemberName, actions } = this.props;

    if (actions) {
      return (
        <div>
          <Header as="h2">Active Tasks</Header>
          <Item.Group divided={true}>
            {Object.keys(actions || {}).map((element: string) => {
              return this.renderItem(actions[element]);
            })}
          </Item.Group>
        </div>
      );
    }

    if (teamMemberName) {
      return <p>{teamMemberName} has no development tasks. Add one now!</p>;
    }

    return null;
  }

  private renderItem(teamMemeberAction: ITeamMemberAction) {
    if (
      !teamMemeberAction ||
      teamMemeberAction.status === TeamMemberActionStatus.done
    ) {
      return null;
    }
    const technique =
      getTechniques().find(el => el.id === teamMemeberAction.techniqueId) ||
      ({} as ITechnique);
    if (!technique) {
      return null;
    }

    const noteFieldName = TeamMemberActionList.getNoteFieldName(
      teamMemeberAction.id
    );
    return (
      <Item key={teamMemeberAction.id}>
        <Item.Content>
          <Item.Header>{technique.name}</Item.Header>
          <Item.Meta>
            <span className="source">
              {technique.sourcename + " - " + technique.locationInSource}
            </span>
          </Item.Meta>
          <Item.Meta>
            <span className="created">
              {"Created On: " +
                new Date(teamMemeberAction.dateAdded).toLocaleDateString()}
            </span>
          </Item.Meta>
          <Item.Description>{technique.description}</Item.Description>
          <Form>
            <Form.Input label="Your Notes">
              <TextArea
                name={noteFieldName}
                autoHeight={true}
                placeholder="Add some notes..."
                onChange={this.handleChange}
                value={this.state && this.state[noteFieldName]}
              />
            </Form.Input>
          </Form>

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
              Mark Completed
              <Icon className="right chevron" />
            </Button>
            <Button
              type="button"
              positive={true}
              floated="right"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={(e: any, data: ButtonProps) => {
                this.props.onSaveNotesClick(
                  teamMemeberAction.id,
                  this.state[noteFieldName]
                );
              }}
            >
              <Icon className="checkmark" />
              Save Notes
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}
