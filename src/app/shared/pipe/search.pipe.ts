import { Pipe, PipeTransform } from '@angular/core';
import { BankAccounts } from "../interface/apiInterface";

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(value: BankAccounts[], search: string): BankAccounts[] {
    if (!search.trim()) {
      return value;
    }

    const dataBankAccount: BankAccounts[] = [];

    value.forEach((account) => {
      if (account.accountType.toLowerCase().includes(search.toLowerCase())
        || account.currency.toLowerCase().includes(search.toLowerCase())) {
        dataBankAccount.push(account);
      }
    });

    return dataBankAccount;
  }

}
