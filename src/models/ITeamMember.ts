import { TeamMemberStatus } from "./Enums";

export default interface ITeamMember {
  color: string;
  id: string;
  name: string;
  status: TeamMemberStatus;
  actions: {};
}

export class TeamMember implements ITeamMember {
  public color: string;
  public id: string;
  public name: string;
  public status: TeamMemberStatus;
  public actions: {};

  constructor(name: string, color: string) {
    this.color = color;
    this.name = name;
    this.id = "";
    this.status = TeamMemberStatus.active;
  }
}
