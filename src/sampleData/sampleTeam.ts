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
        id: "1",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "terrible work today",
        id: "2",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "great work this time",
        id: "3",
        sentiment: TeamMemberNoteSentiment.positive
      }
    ],
    status: TeamMemberStatus.active,
    todos: [
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about life",
        id: "1",
        status: TeamMemberTodoStatus.active
      },
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "chat about career",
        id: "2",
        status: TeamMemberTodoStatus.active
      }
    ]
  },
  {
    actions: [
      {
        actionDetails: {
          description: "blah",
          id: "1",
          locationInSource: "fdf",
          name: "fgdfg",
          sourceDetails: {
            author: "sdfsdf",
            id: "1",
            name: "sdfsdfsd",
            referralLink: "fsfsdfsdf",
            type: ActionSourceType.blog
          }
        },

        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "description",
        id: "1",
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
        id: "1",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "Lucy - awful work today",
        id: "2",
        sentiment: TeamMemberNoteSentiment.negative
      },
      {
        dateAdded: new Date(),
        description: "Lucy - fantastic work this time",
        id: "3",
        sentiment: TeamMemberNoteSentiment.positive
      }
    ],
    status: TeamMemberStatus.active,
    todos: [
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "Lucy - chat about life",
        id: "1",
        status: TeamMemberTodoStatus.active
      },
      {
        dateAdded: new Date(),
        dateCompleted: new Date(),
        description: "Lucy - chat about career",
        id: "2",
        status: TeamMemberTodoStatus.active
      }
    ]
  }
);

export default teamMembers;
