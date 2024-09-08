import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { SystemService } from "../../service/system.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CurrentUser } from "../../interface/apiInterface";
import { ToastrService } from "ngx-toastr";
import { LanguageComponent } from "../language/language.component";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LanguageComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropdown') dropdown?: ElementRef;
  systemService = inject(SystemService);
  destroyRef = inject(DestroyRef);
  toastr = inject(ToastrService);
  translateService = inject(TranslateService);
  router = inject(Router);
  currentUser: CurrentUser = {firstName: '', lastName: '', passportNumber: ''};
  dropdownOpen: boolean = false;
  notificationCount: number = 4;
  messageCount: number = 2;
  companiesList = [
    { name: 'Company LLC', role: 'Owner' },
    { name: 'Company 2', role: 'Executive director' },
    { name: 'Company 2', role: 'Manager' },
    { name: 'Company 2', role: 'Owner' }
  ];
  ngOnInit() {
    this.systemService.getUserData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.currentUser = res.result;
    }, (er) => {
      this.toastr.error(er.error.message)
    })
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
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

}
