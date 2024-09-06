import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {LogoLeftBlockComponent} from "../../shared/component/main-left-block/logo-left-block/logo-left-block.component";
import {ButtonComponent} from "../../shared/component/custom-button/button/button.component";
import {ContactInfo, CountryList, PhoneNumberRequest} from "../../shared/interface/apiInterface";
import {LoginService} from "../../shared/service/login.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LogoLeftBlockComponent,
    ButtonComponent,
    NgxMaskDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginService = inject(LoginService)
  translateService = inject(TranslateService)
  toastr = inject(ToastrService)

  countries: CountryList[] = [];
  selectedCountry!: CountryList;
  phoneNumber: string = '';
  dropdownOpen: boolean = false;
  password: string = '';
  passwordVisible: boolean = false;
  showPasswordInputBlock: boolean = false;
  verifyUserInfo!: PhoneNumberRequest;


  ngOnInit() {
    this.getCountryList()
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getCountryList() {
    this.loginService.getCountryCodeData().subscribe((res) => {
      this.countries = res['result'] as CountryList[];
      this.setCountryCode;
    }, (er) => {
      this.toastr.error(er.error.message)
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


  verifyUser() {
    let phoneNumberWithCountryCode = this.phoneNumber;
    if (!this.phoneNumber.startsWith(String(this.selectedCountry.countryCode))) {
      phoneNumberWithCountryCode = this.selectedCountry.countryCode + this.phoneNumber;
    }
    this.verifyUserInfo = {
      "username": phoneNumberWithCountryCode,
    };
    this.loginService.checkPhoneNumber(this.verifyUserInfo).subscribe(res => {
      this.toastr.success(res.message);
      this.showPasswordInputBlock = true;
    }, (er) => {
      this.toastr.error(er.error.message);
    });
  }

  signIn() {
    this.verifyUserInfo['password'] = this.password;
    this.loginService.signIn(this.verifyUserInfo).subscribe(res => {
        this.toastr.success(this.translateService.instant('global.authSuccess'));
      //  set token localstorage
      },
      (er) => {
      this.toastr.error(er.error.message);
    })
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get setCountryCode() {
    return this.selectedCountry = this.countries.find(country => country.countryCode === 374)!;

  }

}
