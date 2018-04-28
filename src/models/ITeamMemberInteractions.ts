import { TeamMemberNoteSentiment } from "./Enums";

export default interface ITeamMemberNote {
  id: string;
  description: string;
  sentiment: TeamMemberNoteSentiment;
  dateAdded: number;
}

export class TeamMemberNote implements ITeamMemberNote {
  public id: string;
  public description: string;
  public sentiment: TeamMemberNoteSentiment;
  public dateAdded: number;
  constructor(description: string, sentiment: TeamMemberNoteSentiment) {
    this.description = description;
    this.dateAdded = new Date().getTime();
    this.sentiment = sentiment;
  }
}
