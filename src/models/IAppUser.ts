export default interface IAppUser {
  displayName: string;
  email: string;
  uid: string;
  teamMembers: {};
}

export class AppUser implements IAppUser {
  public displayName: string;
  public email: string;
  public uid: string;
  public teamMembers: {};

  constructor() {
    this.teamMembers = {};
  }
}
