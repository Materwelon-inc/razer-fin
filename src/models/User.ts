class User {
  email: string;
  first_name: string;
  last_name: string;
  has_password: boolean;

  constructor(email: string, first_name: string, last_name: string, has_password: boolean) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.has_password = has_password;
  }
}
