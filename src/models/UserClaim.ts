export default class UserClaim {
  userid: string;

  claimtype: string;

  claimvalue: string;

  constructor(userId: string, type: string, value: string) {
    this.userid = userId;
    this.claimtype = type;
    this.claimvalue = value;
  }
}
