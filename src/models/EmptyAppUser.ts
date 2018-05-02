import { AppUser } from "./IAppUser";

export class EmptyAppUser extends AppUser {
  constructor() {
    super("Unknown", "", "", {});
  }
}
