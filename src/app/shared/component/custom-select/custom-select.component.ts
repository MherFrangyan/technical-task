import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "../custom-button/button/button.component";
import {LoginService} from "../../service/login.service";
import {ContactInfo, CountryList} from "../../interface/apiInterface";

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [LoginService],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent implements OnInit {
  @Output()
  phone: EventEmitter<ContactInfo> = new EventEmitter<ContactInfo>();

  loginService = inject(LoginService);

  countries: CountryList[] = [];
  selectedCountry!: CountryList;
  phoneNumber: string = '';
  dropdownOpen: boolean = false;

  ngOnInit() {
    this.getCountryList()
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getCountryList() {
    this.loginService.getCountryCodeData().subscribe((res) => {
      if (res.message === "Success") {
        this.countries = res['result'] as CountryList[];
        this.selectedCountry = this.countries.find(country => country.countryCode === 374)!
        console.log(res['result']);
      }
    })
  }

  selectCountry(ev: Event) {
    this.dropdownOpen = false;
    this.phoneNumber = ''
    const target = ev.target as HTMLElement;
    const clickedLi = target.closest('li');
    if (clickedLi) {
      this.selectedCountry = this.countries.find(country => country.countryCode === Number(clickedLi.getAttribute('id')))!;
    }
  }

  phoneNumberValue(ev: any) {
    const contactInfo = {
      countryCode: this.selectedCountry.countryCode,
      phoneNumber: +this.phoneNumber
    }
    this.phone.emit(contactInfo)
  }
}
