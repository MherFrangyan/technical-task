import { Injectable, signal } from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AdditionalData, BankAccounts, CurrentUser} from "../interface/apiInterface";

@Injectable({providedIn: 'root'})

export class SystemDataService {
  BankAccountsLists$ = new BehaviorSubject<BankAccounts[]>([]);
  CurrentUser$ = new BehaviorSubject<CurrentUser>({firstName: "", lastName: "", passportNumber: ""});
  AdditionalData$ = new BehaviorSubject<AdditionalData>({description: ""})
}
