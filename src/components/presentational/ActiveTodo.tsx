import * as React from "react";
import { Button, ButtonProps, Icon, Item } from "semantic-ui-react";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";

interface IActiveTodoProps {
  teamMemberTodo: ITeamMemberTodo;
  onCompletedClick: (teamMemberToDoId: string) => void;
}

class ActiveTodo extends React.Component<IActiveTodoProps, any> {
  constructor(props: IActiveTodoProps) {
    super(props);
  }
  public handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });

  public render() {
    const { teamMemberTodo } = this.props;

    return (
      <Item key={teamMemberTodo.id}>
        <Item.Content>
          <Item.Header>{teamMemberTodo.title}</Item.Header>
          <Item.Meta>
            Added: {new Date(teamMemberTodo.dateAdded).toLocaleString()}
          </Item.Meta>
          <Item.Meta>
            Completed: {new Date(teamMemberTodo.dateCompleted).toLocaleString()}
          </Item.Meta>
          <Item.Meta>
            Expected:{" "}
            {new Date(teamMemberTodo.expectedCompletionDate).toLocaleString()}
          </Item.Meta>
          <Item.Meta>Owner: {teamMemberTodo.owner}</Item.Meta>
          <Item.Description>{teamMemberTodo.description}</Item.Description>
          <Item.Extra>
            <Button
              type="button"
              primary={true}
              floated="right"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={(e: any, data: ButtonProps) => {
                this.props.onCompletedClick(teamMemberTodo.id);
              }}
            >
              <Icon className="check" />
              Mark Completed
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ActiveTodo;
