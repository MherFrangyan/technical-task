import { Component, inject } from '@angular/core';
import { UpperCasePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { LanguagePipe } from "../../pipe/language.pipe";

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    UpperCasePipe,
    LanguagePipe
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  translate = inject(TranslateService);
  activeLanguage: string = 'en';
  inactiveLanguage1: string = 'ru';
  inactiveLanguage2: string = 'hy';

  switchLanguage(newLanguage: string) {
    this.translate.use(newLanguage);
    const previousActiveLanguage = this.activeLanguage;
    this.activeLanguage = newLanguage;
    sessionStorage.setItem('language', this.activeLanguage)
    if (this.inactiveLanguage1 === newLanguage) {
      this.inactiveLanguage1 = previousActiveLanguage;
    } else if (this.inactiveLanguage2 === newLanguage) {
      this.inactiveLanguage2 = previousActiveLanguage;
    }
  }
}
