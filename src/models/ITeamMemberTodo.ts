import { TeamMemberTodoStatus } from "./Enums";

export default interface ITeamMemberTodo {
  id: string;
  description: string;
  dateCompleted: number;
  assignedTo: string;
  status: TeamMemberTodoStatus;
  dateAdded: number;
}

export class TeamMemberTodo implements ITeamMemberTodo {
  public id: string;
  public description: string;
  public dateCompleted: number;
  public assignedTo: string;
  public status: TeamMemberTodoStatus;
  public dateAdded: number;

  constructor(assignedTo: string) {
    this.dateAdded = new Date().getTime();
    this.status = TeamMemberTodoStatus.active;
    this.assignedTo = assignedTo;
  }
}
