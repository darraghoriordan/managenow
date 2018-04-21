import { db } from "./firebase";

// User API

export const doCreateUser = (
  id: string,
  email: string,
  displayName: string
) =>
  db.ref(`users/${id}`).set({
    displayName,
    email,
    uid: id
  });

export const onceGetUser = (uid: string) =>
  db
    .ref("users")
    .child(uid)
    .once("value");
