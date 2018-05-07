import * as React from "react";
import {
  Button,
  ButtonProps,
  Form,
  Icon,
  Item,
  TextArea
} from "semantic-ui-react";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import ITechnique from "../../models/ITechnique";

interface IActiveDevelopmentTaskProps {
  technique: ITechnique;
  teamMemeberAction: ITeamMemberAction;
  onCompletedClick: (teamMemberActionId: string, notes: string) => void;
  onSaveNotesClick: (teamMemberActionId: string, notes: string) => void;
}
interface IActiveDevelopmentTaskState {
  notes: string;
}
class ActiveDevelopmentTask extends React.Component<
  IActiveDevelopmentTaskProps,
  IActiveDevelopmentTaskState
> {
  public static getDerivedStateFromProps(
    nextProps: IActiveDevelopmentTaskProps,
    prevState: IActiveDevelopmentTaskState
  ) {
    if (nextProps.teamMemeberAction.notes !== prevState.notes) {
      return { notes: nextProps.teamMemeberAction.notes };
    }

    return null;
  }
  constructor(props: IActiveDevelopmentTaskProps) {
    super(props);

    this.state = { notes: "" };
  }
  public handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });

  public render() {
    const { technique, teamMemeberAction } = this.props;
    const noteFieldName = "notes";
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
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ActiveDevelopmentTask;
