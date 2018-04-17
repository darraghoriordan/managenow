import { TeamMemberStatus } from "./Enums";
import ITeamMemberNote from "./ITeamMemberNote";
import ITeamMemberTodo from "./ITeamMemberTodo";

export default interface ITeamMember {
  name: string;
  status: TeamMemberStatus;
  notes: ITeamMemberNote[];
  todos: ITeamMemberTodo[];
}
