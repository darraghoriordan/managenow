import { TeamMemberActionStatus } from "./Enums";
import IActionTechnique from "./IActionTechnique";

export default interface ITeamMemberAction {
  description: string;
  dateCompleted: Date;
  status: TeamMemberActionStatus;
  notes: string;
  actionDetails: IActionTechnique;
  dateAdded: Date;
}
