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


export class TeamMember implements ITeamMember {
  public id: string;
  public name: string;
  public status: TeamMemberStatus;
  public notes: ITeamMemberNote[];
  public todos: ITeamMemberTodo[];
  public actions: ITeamMemberAction[];

  constructor(name:string){
    this.name = name;
  }
}

