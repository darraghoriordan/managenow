import { TeamMemberTodoStatus } from "./Enums";

export default interface ITeamMemberTodo {
  description: string;
  dateCompleted: Date;
  status: TeamMemberTodoStatus;
  dateAdded: Date;
}
