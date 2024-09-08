import { Pipe, PipeTransform } from '@angular/core';
import { LanguageEnum, LanguageType } from "../enum/enum";

@Pipe({
  name: 'translateLanguage',
  standalone: true
})
export class LanguagePipe implements PipeTransform {
  transform(value: string): string {
    return LanguageEnum[value as LanguageType];
  }

}
