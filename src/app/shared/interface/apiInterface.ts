export interface ApiResponse<T> {
  message: string;
  [key: string]: T | string;
}

export interface CountryList {
  countryCode: number;
  countryName: string;
}

export interface ContactInfo {
  countryCode: number;
  phoneNumber: number;
}

export interface PhoneNumberRequest {
  username: string;
  password?: string;
}
