import IAppUser from "../models/IAppUser";
import ITeamMember from "../models/ITeamMember";
import { db } from "./firebase";

export const createUser = (user: IAppUser) =>
  db.ref(`users/${user.uid}`).set(user);

export const getUserOnce = (uid: string) =>
  db
    .ref("users")
    .child(uid)
    .once("value");

export const deleteTeamMember = (uid: string, teamMemberId: string) => {
  return db.ref("/users/" + uid + "/teamMembers/" + teamMemberId).remove();
};
export const saveTeamMember = (uid: string, teamMember: ITeamMember) => {
  // if we dont already have an id try to get one from firebase
  if (!teamMember.id) {
    const newTeamMemberKey: string =
      db.ref("users/" + uid + "/teamMembers/").push().key || "error";

    if (newTeamMemberKey === "error") {
      // tslint:disable-next-line:no-console
      console.log("saving teamMember error");
      return Promise.reject("saving teamMember error");
    }

    const updates: any = {};
    teamMember.id = newTeamMemberKey;
    updates["/users/" + uid + "/teamMembers/" + teamMember.id] = teamMember;

    return db
      .ref()
      .update(updates)
      .then(() => Promise.resolve(teamMember));
  }

  return db
    .ref("users")
    .child(uid)
    .child("teamMembers")
    .child(teamMember.id)
    .update(teamMember);
};
