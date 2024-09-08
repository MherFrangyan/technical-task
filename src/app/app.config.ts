import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { mainInterceptor } from "./shared/interceptor/interceptor";
import { provideEnvironmentNgxMask } from "ngx-mask";

export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const provideTranslation = () => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: TranslateLoaderFactory,
    deps: [HttpClient],
  },
});

const initializeLanguage = (translateService: TranslateService) => {
  return () => {
    const savedLanguage = sessionStorage.getItem('language') || 'en';
    translateService.setDefaultLang(savedLanguage);
    translateService.use(savedLanguage);
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([mainInterceptor])
    ),
    importProvidersFrom([
      TranslateModule.forRoot(provideTranslation())
    ]),
    provideAnimations(),
    provideToastr(),
    provideEnvironmentNgxMask(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLanguage,
      deps: [TranslateService],
      multi: true,
    },
  ]
};
