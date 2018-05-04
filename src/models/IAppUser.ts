export default interface IAppUser {
  readonly displayName: string;
  readonly email: string;
  readonly uid: string;
  readonly teamMembers: {};
  readonly firstName: string;
}

export class AppUser implements IAppUser {
  public readonly displayName: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly uid: string;
  public readonly teamMembers: {};

  constructor(
    displayName: string,
    email: string,
    uid: string,
    teamMembers: {}
  ) {
    this.teamMembers = teamMembers;
    this.displayName = displayName;
    this.email = email;
    this.uid = uid;
    this.firstName = this.getFirstName(this.displayName);
  }

  private getFirstName(fullName: string): string {
    return (fullName || "").split(" ")[0] || fullName;
  }
}

