import { TeamMemberActionStatus } from "./Enums";

export default interface ITeamMemberAction {
  id: string;
  dateCompleted: number;
  status: TeamMemberActionStatus;
  notes: string;
  techniqueId: string;
  dateAdded: number;
}

export class TeamMemberAction implements ITeamMemberAction {
  public id: string;
  public dateCompleted: number;
  public status: TeamMemberActionStatus;
  public notes: string;
  public techniqueId: string;
  public dateAdded: number;
  constructor(techniqueId: string) {
    this.dateAdded = new Date().getTime();
    this.status = TeamMemberActionStatus.active;
    this.techniqueId = techniqueId;
  }
}
