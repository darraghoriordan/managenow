import { TeamMemberStatus } from "./Enums";
import ITeamMemberAction from "./ITeamMemberAction";
import ITeamMemberNote from "./ITeamMemberNote";
import ITeamMemberTodo from "./ITeamMemberTodo";

export default interface ITeamMember {
  id:string;
  name: string;
  status: TeamMemberStatus;
  notes: ITeamMemberNote[];
  todos: ITeamMemberTodo[];
  actions: ITeamMemberAction[];
}
