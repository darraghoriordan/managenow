import { TeamMemberNoteSentiment } from "./Enums";

export default interface ITeamMemberNote {
  id: string;
  description: string;
  sentiment: TeamMemberNoteSentiment;
  dateAdded: Date;
}
