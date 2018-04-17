import { TeamMemberNoteSentiment } from "./Enums";

export default interface ITeamMemberNote {
  description: string;
  sentiment: TeamMemberNoteSentiment;
  dateAdded: Date;
}
