import {
  ActionSourceType,
  TeamMemberActionStatus,
  TeamMemberNoteSentiment,
  TeamMemberStatus,
  TeamMemberTodoStatus
} from "../models/Enums";
import ITeamMember from "../models/ITeamMember";

const teamMembers = new Array<ITeamMember>();
teamMembers.push(
  {
    actions: [],
    id: "1",
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
    actions: [
      {
        actionDetails: {
          description: "blah",
          locationInSource: "fdf",
          name: "fgdfg",
          sourceDetails: {
            author: "sdfsdf",
            name: "sdfsdfsd",
            referralLink: "fsfsdfsdf",
            type: ActionSourceType.blog
          }
        },
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "description",
        notes: "notes",
        status: TeamMemberActionStatus.active
      }
    ],
    id: "2",
    name: "Lucy",
    notes: [
      {
        dateAdded: new Date(),
        description: "Lucy - awful work today",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "Lucy - awful work today",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "Lucy - fantastic work this time",
        sentiment: TeamMemberNoteSentiment.positive
      }
    ],
    status: TeamMemberStatus.active,
    todos: [
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "Lucy - chat about life",
        status: TeamMemberTodoStatus.active
      },
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "Lucy - chat about career",
        status: TeamMemberTodoStatus.active
      }
    ]
  }
);

export default teamMembers;
