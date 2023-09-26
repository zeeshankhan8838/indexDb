import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let hideLoader = req.params.get('hideLoader');

    const accessToken = this.tokenStorageService.getAccessToken();

    if (accessToken) {
      req = this.addTokenToRequest(req, accessToken);
    }

    return next.handle(req);
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    let isTokenSkip = request.params.get('X-Skip-Token');

    if (isTokenSkip == 'true') {
      const params = request.params.delete('X-Skip-Token');
      request = request.clone({ params });
    }
    if (request.url.includes(environment.apiURL)) {
      if (!!token) {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return request;
  }
}
