import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BankAccountListComponent } from "./components/bank-account-list/bank-account-list.component";
import { AdditionalInfoComponent } from "./components/additional-info/additional-info.component";
import { SystemService } from "../../shared/service/system.service";
import { TranslateModule } from "@ngx-translate/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, BankAccountListComponent, BankAccountListComponent, AdditionalInfoComponent, TranslateModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  navigateList: string[] = ['Breadcrumb1', 'Breadcrumb2','Breadcrumb3']
  systemService = inject(SystemService)
  destroyRef = inject(DestroyRef)
  ngOnInit() {
    this.systemService.getTransactions().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      console.log('getTransactions: ', res);
    })
  }
}
