export interface ApiResponse {
  message: string;
  result: any;
}

export interface CountryList {
  countryCode: number;
  countryName: string;
}

export interface PhoneNumberRequest {
  username: string;
  password?: string;
}

export interface CurrentUser {
  firstName: string,
  lastName: string,
  passportNumber: string,
}

export interface BankAccounts {
  accountNumber: string,
  accountType: string,
  currency: string,
  balance: string,
}

export interface AdditionalData {
  description: string;
}
