import ITeamMember from "../Models/ITeamMember";
import { TeamMemberStatus } from "../Models/TeamMemberStatus";

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