import IAppUser from "../models/IAppUser";
import ITeamMember from "../models/ITeamMember";
import ITeamMemberAction from "../models/ITeamMemberAction";
import ITeamMemberInteraction from "../models/ITeamMemberInteractions";
import { db } from "./firebase";

export const createUser = (user: IAppUser) =>
  db.ref(`/users/${user.uid}`).set(user);

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
      db.ref("/users/" + uid + "/teamMembers/").push().key || "error";

    if (newTeamMemberKey === "error") {
      // tslint:disable-next-line:no-console
      console.log("saving teamMember error");
      return Promise.reject("saving teamMember error");
    }
    teamMember.id = newTeamMemberKey;
  }

  const updates: any = {};
  updates["/users/" + uid + "/teamMembers/" + teamMember.id] = teamMember;

  return db
    .ref()
    .update(updates)
    .then(() => Promise.resolve(teamMember));
};
export const saveTeamMemberAction = (
  uid: string,
  teamMemberId: string,
  teamMemberAction: ITeamMemberAction
) => {
  // if we dont already have an id try to get one from firebase
  if (!teamMemberAction.id) {
    const newTeamMemberActionKey: string =
      db
        .ref("/users/" + uid + "/teamMembers/" + teamMemberId + "/actions")
        .push().key || "error";

    if (newTeamMemberActionKey === "error") {
      // tslint:disable-next-line:no-console
      console.log("saving teamMember action error");
      return Promise.reject("saving teamMember action error");
    }
    teamMemberAction.id = newTeamMemberActionKey;
  }
  const updates: any = {};

  updates[
    "/users/" +
      uid +
      "/teamMembers/" +
      teamMemberId +
      "/actions/" +
      teamMemberAction.id
  ] = teamMemberAction;

  return db
    .ref()
    .update(updates)
    .then(() => Promise.resolve(teamMemberAction));
};

export const saveTeamMemberInteraction = (
  uid: string,
  teamMemberId: string,
  teamMemberInteraction: ITeamMemberInteraction
) => {
  // if we dont already have an id try to get one from firebase
  if (!teamMemberInteraction.id) {
    const newKey: string =
      db
        .ref("/users/" + uid + "/teamMembers/" + teamMemberId + "/interactions")
        .push().key || "error";

    if (newKey === "error") {
      // tslint:disable-next-line:no-console
      console.log("saving teamMember interaction error");
      return Promise.reject("saving teamMember interaction error");
    }
    teamMemberInteraction.id = newKey;
  }
  const updates: any = {};

  updates[
    "/users/" +
      uid +
      "/teamMembers/" +
      teamMemberId +
      "/interactions/" +
      teamMemberInteraction.id
  ] = teamMemberInteraction;

  return db
    .ref()
    .update(updates)
    .then(() => Promise.resolve(teamMemberInteraction));
};
