export class MambuConfig {
  static baseUrl = 'https://razerhackathon.sandbox.mambu.com';
  static RequiredProperties = [ 'first_name', 'last_name', 'preferred_language', 'notes', 'assigned_branch_key', 'country_of_birth' ];
  static MambuProducts = {
    CurrentAccount: '8a8e878471bf59cf0171bf6979700440',
    EndowmentPlan: '8a8e867271bd280c0171bf768b9c1a81',
    SmallTermLoan: '8a8e867271bd280c0171bf768cc31a89',
    LargeTermLoan: '8a8e878e71c7a4d70171c85a697b01f7',
  };
};
