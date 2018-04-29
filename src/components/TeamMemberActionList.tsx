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
  constructor(props: ITeamMemberActionListProps) {
    super(props);
    this.getNoteFieldName = this.getNoteFieldName.bind(this);

    Object.keys(this.props.actions).forEach((x: string) => {
      this.state = {
        ...this.state,
        [this.getNoteFieldName(x)]: this.props.actions[x].notes
      };
    });
  }
  public handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });
  public render() {
    const { teamMemberName, actions } = this.props;
    if (!actions && !teamMemberName){
      return null;
    }

    if (actions) {
      return (
        <div>
          <Header as="h2">Active Tasks</Header>
          <Item.Group divided={true}>
            {Object.keys(actions).map((element: string) =>
              this.renderItem(actions[element])
            )}
          </Item.Group>
        </div>
      );
    } else {
      return <p>{teamMemberName} has no development tasks. Add one now!</p>;
    }
  }
  private getNoteFieldName(actionId: string): string {
    return actionId + "-notes";
  }
  private renderItem(teamMemeberAction: ITeamMemberAction) {
    const technique =
      getTechniques().find(el => el.id === teamMemeberAction.techniqueId) ||
      ({} as ITechnique);
    return (
      <Item key={teamMemeberAction.id}>
        <Item.Content>
          <Item.Header>{technique.name}</Item.Header>
          <Item.Meta>
            <span className="source">{technique.sourcename +" - "+ technique.locationInSource}</span>
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
                name={this.getNoteFieldName(teamMemeberAction.id)}
                autoHeight={true}
                placeholder="Add some notes..."
                onChange={this.handleChange}
                value={this.state[this.getNoteFieldName(teamMemeberAction.id)]}
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
                  this.state[this.getNoteFieldName(teamMemeberAction.id)]
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
