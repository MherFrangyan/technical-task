import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../assets/environment/environment";
import { ApiResponse, PhoneNumberRequest } from "../interface/apiInterface";
const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})

export class LoginService {
  constructor(private http: HttpClient) { }

  getCountryCodeData(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${API_URL}GetCountryCode`);
  }

  checkPhoneNumber(body: PhoneNumberRequest): Observable<any> {
    return this.http.post<Observable<any>>(`${API_URL}checkPhone`, body)
  }

  signIn(body: PhoneNumberRequest): Observable<any> {
    return this.http.post<Observable<any>>(`${API_URL}login`, body)
  }
}
