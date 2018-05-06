import { TeamMemberStatus } from "./Enums";

export default interface ITeamMember {
  color: string;
  id: string;
  name: string;
  status: TeamMemberStatus;
  actions: {};
  createdDate: number;
}

export class TeamMember implements ITeamMember {
  public color: string;
  public id: string;
  public name: string;
  public status: TeamMemberStatus;
  public actions: {};
  public createdDate: number;

  constructor(name: string, color: string) {
    this.color = color;
    this.name = name;
    this.id = "";
    this.status = TeamMemberStatus.active;
    this.createdDate = new Date().getTime();
  }
}
