import ITeamMember from "../models/ITeamMember";

export const validateTeamMemberForSave = (
  teamMember: ITeamMember
): Promise<ITeamMember> => {
  if (!teamMember.name) {
    return Promise.reject("Can't save team member with no name");
  }

  return Promise.resolve(teamMember);
};
