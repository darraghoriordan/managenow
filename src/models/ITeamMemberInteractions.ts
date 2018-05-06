import { TeamMemberInteractionSentiment } from "./Enums";

export default interface ITeamMemberInteraction {
  id: string;
  description: string;
  computedSentiment: TeamMemberInteractionSentiment;
  manualSentiment: TeamMemberInteractionSentiment;
  dateAdded: number;
}

export class TeamMemberInteraction implements ITeamMemberInteraction {
  public id: string;
  public description: string;
  public computedSentiment: TeamMemberInteractionSentiment;
  public manualSentiment: TeamMemberInteractionSentiment;
  public dateAdded: number;
  constructor(
    description: string,
    computedSentiment: TeamMemberInteractionSentiment
  ) {
    this.description = description;
    this.dateAdded = new Date().getTime();
    this.computedSentiment = computedSentiment;
  }
}
