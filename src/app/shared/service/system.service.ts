import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../assets/environment/environment";
import { catchError, forkJoin, Observable, of } from "rxjs";
import { AdditionalData, ApiResponse, BankAccounts, CurrentUser } from "../interface/apiInterface";
import { ToastrService } from "ngx-toastr";
const API_URL = environment.apiUrl;

@Injectable({providedIn: "root"})

export class SystemService {
  http = inject(HttpClient);
  toastr = inject(ToastrService);


  getUserData(): Observable<ApiResponse<CurrentUser> | {}> {
    return this.http.get<ApiResponse<CurrentUser>>(`${API_URL}getUserData`).pipe(
      catchError((err) => {
        this.toastr.error(err.error.message)
        return of({});
      })
    );
  }
  getBankAccounts(): Observable<ApiResponse<BankAccounts> | {}> {
    return this.http.get<ApiResponse<BankAccounts>>(`${API_URL}getBankAccounts`).pipe(
      catchError((err) => {
        this.toastr.error(err.error.message)
        return of({});
      })
    );
  }

  getAdditionalData(): Observable<ApiResponse<AdditionalData> | {}> {
    return this.http.get<ApiResponse<AdditionalData>>(`${API_URL}getAdditionalData`).pipe(
      catchError((err) => {
        this.toastr.error(err.error.message)
        return of({});
      })
    );
  }

  getTransactions(): Observable<ApiResponse<any> | {}> {
    return this.http.get<ApiResponse<any>>(`${API_URL}getTransactions`).pipe(
      catchError((err) => {
        this.toastr.error(err.error.message)
        return of({});
      })
    );
  }

  getAllData(): Observable<any> {
    return forkJoin({
      transactions: this.getTransactions(),
      userData: this.getUserData(),
      bankAccounts: this.getBankAccounts(),
      additionalData: this.getAdditionalData()
    });
  }
}
