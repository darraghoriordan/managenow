import { TeamMemberActionStatus } from "./Enums";

export default interface ITeamMemberAction {
  id: string;
  dateCompleted: Date;
  status: TeamMemberActionStatus;
  notes: string;
  techniqueId: string;
  dateAdded: Date;
}

export class TeamMemberAction implements ITeamMemberAction {
  public id: string;
  public dateCompleted: Date;
  public status: TeamMemberActionStatus;
  public notes: string;
  public techniqueId: string;
  public dateAdded: Date;
  constructor(techniqueId: string) {
    this.dateAdded = new Date();
    this.status = TeamMemberActionStatus.active;
    this.techniqueId = techniqueId;
  }
}
