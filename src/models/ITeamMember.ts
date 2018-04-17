import { TeamMemberStatus } from "./Enums";
import ITeamMemberNote from "./ITeamMemberNote";

export default interface ITeamMember {
  name: string;
  status: TeamMemberStatus;
  notes: ITeamMemberNote[];
}
