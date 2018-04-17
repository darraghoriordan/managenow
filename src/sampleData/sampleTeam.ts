import { TeamMemberNoteSentiment, TeamMemberStatus } from "../models/Enums";
import ITeamMember from "../models/ITeamMember";

const teamMembers = new Array<ITeamMember>();
teamMembers.push(
  {
    name: "Mark",
    notes: [
      {
        dateAdded: new Date(),
        description: "terrible work today",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "terrible work today",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "great work this time",
        sentiment: TeamMemberNoteSentiment.positive
      }
    ],
    status: TeamMemberStatus.active
  },
  {
    name: "Lucy",
    notes: [      {
      dateAdded: new Date(),
      description: "awful work today",
      sentiment: TeamMemberNoteSentiment.negative
    },
    {
      dateAdded: new Date(),
      description: "awful work today",
      sentiment: TeamMemberNoteSentiment.negative
    },
    {
      dateAdded: new Date(),
      description: "fantastic work this time",
      sentiment: TeamMemberNoteSentiment.positive
    }],
    status: TeamMemberStatus.active
  }
);

export default teamMembers;
