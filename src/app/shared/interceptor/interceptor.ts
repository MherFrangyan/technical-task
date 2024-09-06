import {catchError, finalize, throwError} from "rxjs";
import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {LoaderService} from "../service/loader.service";

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  loaderService.isLoading.update(value => value + 1);

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'test'
    }
  })
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Logging Interceptor Functional Error:', error);
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.isLoading.update(value => value - 1);
    })
  )
}
