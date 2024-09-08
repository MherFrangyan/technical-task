import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../assets/environment/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../interface/apiInterface";
const API_URL = environment.apiUrl;

@Injectable({providedIn: "root"})

export class SystemService {
  http = inject(HttpClient);

  getUserData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}getUserData`)
  }
  getBankAccounts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}getBankAccounts`)
  }

  getAdditionalData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}getAdditionalData`)
  }

  getTransactions(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}getTransactions`)
  }
}
