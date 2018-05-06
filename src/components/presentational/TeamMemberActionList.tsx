import * as React from "react";
import {
  Button,
  ButtonProps,
  Divider,
  Form,
  Header,
  Icon,
  Item,
  TextArea
} from "semantic-ui-react";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import ITechnique from "../../models/ITechnique";

interface ITeamMemberActionListProps {
  actions: {};
  teamMemberName: string;
  techniques: ITechnique[];
  onCompletedClick: (teamMemberActionId: string, notes: string) => void;
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
    const activeTasks = Object.keys(actions || {})
      .map((element: string) => actions[element] as ITeamMemberAction)
      .filter(
        (el: ITeamMemberAction) => el.status === TeamMemberActionStatus.active
      );

    const completedTasks = Object.keys(actions || {})
      .map((element: string) => actions[element] as ITeamMemberAction)
      .filter(
        (el: ITeamMemberAction) => el.status === TeamMemberActionStatus.done
      );
    return (
      <div>
        <div>
          <Header as="h2">Active Development Tasks</Header>
          <Item.Group divided={true}>
            {activeTasks.map((el: ITeamMemberAction) => {
              return this.renderItem(el);
            })}
          </Item.Group>
          {(!activeTasks || activeTasks.length <= 0) && (
            <p>{teamMemberName} has no active development tasks. Add one now!</p>
          )}
        </div>
        
        {completedTasks && completedTasks.length > 0 && (
          <div>
            <Divider />
            <Header as="h2">Development Task History</Header>
            <Item.Group divided={true}>
              {Object.keys(actions || {})
                .map((element: string) => actions[element] as ITeamMemberAction)
                .filter(
                  (el: ITeamMemberAction) =>
                    el.status === TeamMemberActionStatus.done
                )
                .map((el: ITeamMemberAction) => {
                  return this.renderItem(el);
                })}
            </Item.Group>
          </div>
        )}
      </div>
    );
  }

  private renderItem(teamMemeberAction: ITeamMemberAction) {
    const technique =
      this.props.techniques.find(
        el => el.id === teamMemeberAction.techniqueId
      ) || ({} as ITechnique);
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
          {teamMemeberAction.status === TeamMemberActionStatus.active && (
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
          )}
          {teamMemeberAction.status === TeamMemberActionStatus.done && (
            <div>
              <Header as="h4">Notes</Header>
              <p>{teamMemeberAction.notes}</p>
            </div>
          )}
          <Item.Extra>
            {teamMemeberAction.status === TeamMemberActionStatus.active && (
              <div>
                {" "}
                <Button
                  type="button"
                  primary={true}
                  floated="right"
                  // tslint:disable-next-line:jsx-no-lambda
                  onClick={(e: any, data: ButtonProps) => {
                    this.props.onCompletedClick(
                      teamMemeberAction.id,
                      this.state[noteFieldName]
                    );
                  }}
                >
                  <Icon className="check" />
                  Mark Completed
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
                  <Icon className="save" />
                  Save Notes
                </Button>
              </div>
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}
