import * as React from "react";
import { Item } from "semantic-ui-react";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";

interface IInactiveTodoProps {
  teamMemberTodo: ITeamMemberTodo;
}

class InactiveTodo extends React.Component<
  IInactiveTodoProps,
  any
> {
  constructor(props: IInactiveTodoProps) {
    super(props);
  }

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
        </Item.Content>
      </Item>
    );
  }
}

export default InactiveTodo;
