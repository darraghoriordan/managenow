import * as React from "react";
import { TeamMemberTodoStatus } from "../models/Enums";
import ITeamMemberTodo from "../models/ITeamMemberTodo";
import "./TeamMemberNotes.css";
export interface ITeamMemberTodosProps {
  teamMemberTodos: ITeamMemberTodo[];
}
export default class TeamMemberTodos extends React.PureComponent<
  ITeamMemberTodosProps,
  any
> {
  constructor(props: ITeamMemberTodosProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <p>Todos</p>
        {this.props.teamMemberTodos
          .sort((note1, note2) => +note2.dateAdded - +note1.dateAdded)
          .map((x: ITeamMemberTodo) => (
            <p
              className={
                x.status === TeamMemberTodoStatus.active
                  ? "note-positive"
                  : "note-negative"
              }
            >
              {x.dateAdded + " - " + x.description}
            </p>
          ))}
      </div>
    );
  }
}
