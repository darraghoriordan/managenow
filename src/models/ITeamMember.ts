import { TeamMemberStatus } from "./Enums";

export default interface ITeamMember {
  id: string;
  name: string;
  status: TeamMemberStatus;
  actions: {};
}

export class TeamMember implements ITeamMember {
  public id: string;
  public name: string;
  public status: TeamMemberStatus;
  public actions: {};

  constructor(name: string) {
    this.name = name;
    this.id = "";
    this.status = TeamMemberStatus.active;
  }
}
