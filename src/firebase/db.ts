import { db } from "./firebase";

// User API

export const doCreateUser = (id: string, email: string | null) =>
  db.ref(`users/${id}`).set({
    email
  });

export const onceGetUsers = () => db.ref("users").once("value");
