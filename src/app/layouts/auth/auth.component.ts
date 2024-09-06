import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  translate = inject(TranslateService)
  activeLanguage: string = 'en';
  inactiveLanguage1: string = 'ru';
  inactiveLanguage2: string = 'hy';

  constructor() {}

  switchLanguage(newLanguage: string) {
      this.translate.use(newLanguage);
      const previousActiveLanguage = this.activeLanguage;
      this.activeLanguage = newLanguage;
      if (this.inactiveLanguage1 === newLanguage) {
        this.inactiveLanguage1 = previousActiveLanguage;
      } else if (this.inactiveLanguage2 === newLanguage) {
        this.inactiveLanguage2 = previousActiveLanguage;
      }
    }
}
