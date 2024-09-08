import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxMaskDirective } from "ngx-mask";
import { FormsModule } from "@angular/forms";
import { SearchPipe } from "../../../../shared/pipe/search.pipe";
import { SystemService } from "../../../../shared/service/system.service";
import { BankAccounts } from "../../../../shared/interface/apiInterface";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-bank-account-list',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, FormsModule, SearchPipe, TranslateModule],
  templateUrl: './bank-account-list.component.html',
  styleUrl: './bank-account-list.component.scss'
})
export class BankAccountListComponent implements OnInit {
  systemService = inject(SystemService);
  translateService = inject(TranslateService);
  destroyRef = inject(DestroyRef);
  bankAccountsLists: BankAccounts[] = [];
  cardNumberVisibleList: string[] = [];
  balanceCountVisibleList: string[] = [];
  searchAccountType: string = '';

  ngOnInit() {
    this.systemService.getBankAccounts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.bankAccountsLists = res.result;
    })
  }

  showCardNumberValue(accountNumber: string) {
    if (this.cardNumberVisibleList.indexOf(accountNumber) >= 0) {
      this.cardNumberVisibleList.splice(this.cardNumberVisibleList.indexOf(accountNumber), 1)
      return;
    }
    this.cardNumberVisibleList.push(accountNumber)
  }

  showBalanceValue(balanceCount: string) {
    if (this.balanceCountVisibleList.indexOf(balanceCount) >= 0) {
      this.balanceCountVisibleList.splice(this.balanceCountVisibleList.indexOf(balanceCount), 1)
      return;
    }
    this.balanceCountVisibleList.push(balanceCount)
  }
}
