import { TeamMemberTodoStatus } from "./Enums";

export default interface ITeamMemberTodo {
  id: string;
  description: string;
  dateCompleted: Date;
  status: TeamMemberTodoStatus;
  dateAdded: Date;
}
