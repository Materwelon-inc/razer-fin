class UserClaim {
  userid: string;
  claimtype: string;
  claimvalue: string;

  constructor(user_id: string, type: string, value: string) {
    this.userid = user_id;
    this.claimtype = type;
    this.claimvalue = value;
  }
}
