import { TeamMemberToDoOwner, TeamMemberTodoStatus } from "./Enums";

export default interface ITeamMemberTodo {
  id: string;
  description: string;
  dateCompleted: number;
  expectedCompletionDate: number;
  owner:TeamMemberToDoOwner;
  status: TeamMemberTodoStatus;
  dateAdded: number;
  title: string;
}

export class TeamMemberTodo implements ITeamMemberTodo {
  public id: string;
  public description: string;
  public title: string;
  public dateCompleted: number;
  public expectedCompletionDate: number;
  public owner: TeamMemberToDoOwner;
  public status: TeamMemberTodoStatus;
  public dateAdded: number;

  constructor(
    title: string,
    description: string,
    owner: TeamMemberToDoOwner,
    expectedCompletionDate: number
  ) {
    this.expectedCompletionDate = expectedCompletionDate;
    this.dateAdded = new Date().getTime();
    this.status = TeamMemberTodoStatus.active;
    this.owner = owner;
  }
}
