import {
  TeamMemberNoteSentiment,
  TeamMemberStatus,
  TeamMemberTodoStatus
} from "../models/Enums";
import ITeamMember from "../models/ITeamMember";

const teamMembers = new Array<ITeamMember>();
teamMembers.push(
  {
    actions: [],
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
    status: TeamMemberStatus.active,
    todos: [
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about life",
        status: TeamMemberTodoStatus.active
      },
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about career",
        status: TeamMemberTodoStatus.active
      }
    ]
  },
  {
    actions: [],
    name: "Lucy",
    notes: [
      {
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
      }
    ],
    status: TeamMemberStatus.active,
    todos: [
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about life",
        status: TeamMemberTodoStatus.active
      },
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about career",
        status: TeamMemberTodoStatus.active
      }
    ]
  }
);

export default teamMembers;
