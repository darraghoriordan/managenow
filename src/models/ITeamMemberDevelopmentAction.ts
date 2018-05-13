import { TeamMemberDevelopmentActionStatus } from "./Enums";

export default interface ITeamMemberDevelopmentAction {
  id: string;
  dateCompleted: number;
  status: TeamMemberDevelopmentActionStatus;
  notes: string;
  techniqueId: string;
  dateAdded: number;
}

export class TeamMemberDevelopmentAction
  implements ITeamMemberDevelopmentAction {
  public id: string;
  public dateCompleted: number;
  public status: TeamMemberDevelopmentActionStatus;
  public notes: string;
  public techniqueId: string;
  public dateAdded: number;
  constructor(techniqueId: string) {
    this.dateAdded = new Date().getTime();
    this.status = TeamMemberDevelopmentActionStatus.active;
    this.techniqueId = techniqueId;
  }
}
