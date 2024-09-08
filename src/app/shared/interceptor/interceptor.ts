import { catchError, finalize, throwError } from "rxjs";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "../service/loader.service";
import { Router } from "@angular/router";

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  const router = inject(Router)
  loaderService.isLoading.update(value => value + 1);
  const userToken = localStorage.getItem('token')
  if (userToken) {
    req = req.clone({
      setHeaders: {
        authorization: userToken,
      }
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 403) {
        router.navigate(['/'])
        localStorage.removeItem('token')
      }
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.isLoading.update(value => value - 1);
    })
  )
}
