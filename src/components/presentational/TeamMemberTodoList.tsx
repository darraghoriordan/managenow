import * as React from "react";
import { Divider, Header, Item } from "semantic-ui-react";
import { TeamMemberTodoStatus } from "../../models/Enums";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";
import ActiveTodo from "./ActiveTodo";
import InactiveTodo from "./InactiveTodo";
interface ITeamMemberTodoListProps {
  todos: {};
  teamMemberName: string;
  onTeamMemberToDoComplete: (teamMemberToDoId: string) => void;
}

export default class TeamMemberTodoList extends React.Component<
  ITeamMemberTodoListProps,
  any
> {
  constructor(props: ITeamMemberTodoListProps) {
    super(props);
  }

  public render() {
    const { teamMemberName, todos } = this.props;
    const activeTodos = Object.keys(todos || {})
      .map((element: string) => todos[element] as ITeamMemberTodo)
      .filter(
        (el: ITeamMemberTodo) => el.status === TeamMemberTodoStatus.active
      )
      .sort((a, b) => b.dateAdded - a.dateAdded);

    const completedTodos = Object.keys(todos || {})
      .map((element: string) => todos[element] as ITeamMemberTodo)
      .filter((el: ITeamMemberTodo) => el.status === TeamMemberTodoStatus.done)
      .sort((a, b) => b.dateCompleted - a.dateCompleted);
    return (
      <div>
        <div>
          <Header as="h2">Active Todos</Header>
          <Item.Group divided={true}>
            {activeTodos.map((el: ITeamMemberTodo) => {
              return (
                <ActiveTodo
                  teamMemberTodo={el}
                  onCompletedClick={this.props.onTeamMemberToDoComplete}
                  key={el.id}
                />
              );
            })}
          </Item.Group>
          {(!activeTodos || activeTodos.length <= 0) && (
            <p>{teamMemberName} has no active todo. Add one now!</p>
          )}
        </div>

        {completedTodos &&
          completedTodos.length > 0 && (
            <div>
              <Divider />
              <Header as="h2">Todo History</Header>
              <Item.Group divided={true}>
                {completedTodos.map((el: ITeamMemberTodo) => {
                  return <InactiveTodo key={el.id} teamMemberTodo={el} />;
                })}
              </Item.Group>
            </div>
          )}
      </div>
    );
  }
}
