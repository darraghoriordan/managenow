import {
  ActionSourceType,
  TeamMemberActionStatus,
  TeamMemberStatus} from "../models/Enums";
import ITeamMember from "../models/ITeamMember";

const teamMembers = new Array<ITeamMember>();
teamMembers.push(
  {
    actions: [],
    id: "1",
    name: "Mark",
    status: TeamMemberStatus.active
  },
  {
    actions: {
      action1: {
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
    },
    id: "2",
    name: "Lucy",
    status: TeamMemberStatus.active
  }
);

export default teamMembers;
