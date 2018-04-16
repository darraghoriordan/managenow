import ITeamMember from "../models/ITeamMember";
import { TeamMemberStatus } from "../models/TeamMemberStatus";

const teamMembers = new Array<ITeamMember>();
teamMembers.push(
     {
      name: "Mark",
      status: TeamMemberStatus.active
    },
    {
      name: "Lucy",
      status: TeamMemberStatus.active
    },
  )

  export default teamMembers;