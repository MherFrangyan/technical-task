import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { LogoLeftBlockComponent } from "../../shared/component/logo-left-block/logo-left-block.component";
import { ButtonComponent } from "../../shared/component/custom-button/button/button.component";
import { CountryList, PhoneNumberRequest } from "../../shared/interface/apiInterface";
import { LoginService} from "../../shared/service/login.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgxMaskDirective } from "ngx-mask";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CountryNames, CountryPhoneMasksEnum } from "../../shared/enum/enum";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LogoLeftBlockComponent,
    ButtonComponent,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @ViewChild('dropdown') dropdown?: ElementRef;
  loginService = inject(LoginService);
  translateService = inject(TranslateService);
  destroyRef = inject(DestroyRef);
  toastr = inject(ToastrService)
  router = inject(Router);
  countries: CountryList[] = [];
  selectedCountry: CountryList = {countryName: '', countryCode: 374};
  dropdownOpen: boolean = false;
  passwordVisible: boolean = false;
  showPasswordInputBlock: boolean = false;
  verifyUserInfo!: PhoneNumberRequest;
  phoneMask = CountryPhoneMasksEnum['Armenia'];
  loginForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z]+[0-9]*$')
    ]),
    phoneNumber: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.getCountryList()
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    event.stopPropagation();
    if (!(this.dropdown && this.dropdown.nativeElement.contains(event.target))) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  getCountryList() {
    this.loginService.getCountryCodeData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      this.countries = res['result'] as CountryList[];
      this.setCountryCode;
    }, (er) => {
      this.toastr.error(er.error.message)
    })
  }

  selectCountry(ev: Event) {
    this.dropdownOpen = false;
    this.loginForm.controls['phoneNumber'].setValue('');
    const target = ev.target as HTMLElement;
    const clickedLi = target.closest('li');
    if (clickedLi) {
      this.selectedCountry = this.countries.find(country => country.countryCode === Number(clickedLi.getAttribute('id')))!;
      this.phoneMask = CountryPhoneMasksEnum[this.selectedCountry.countryName as CountryNames]
    }
  }


  verifyUser() {
    let phoneNumberWithCountryCode = this.loginForm.get('phoneNumber')?.value;
    if (!this.loginForm.get('phoneNumber')?.value.startsWith(String(this.selectedCountry.countryCode))) {
      phoneNumberWithCountryCode = this.selectedCountry.countryCode + this.loginForm.get('phoneNumber')?.value;
    }
    this.verifyUserInfo = {
      "username": phoneNumberWithCountryCode,
    };
    this.loginService.checkPhoneNumber(this.verifyUserInfo).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.toastr.success(res.message);
      this.showPasswordInputBlock = true;
    }, (er) => {
      this.toastr.error(er.error.message);
    });
  }

  signIn() {
    this.verifyUserInfo['password'] = this.loginForm.get('password')?.value;
    this.loginService.signIn(this.verifyUserInfo).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/system'])
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

  onEnterKey(type: string) {
    if (type === 'next') {
      this.verifyUser()
    } else {
      this.signIn()
    }
  }
}
