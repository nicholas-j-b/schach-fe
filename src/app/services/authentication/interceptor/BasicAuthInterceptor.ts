import { UserService } from './../../../api/services/user.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor');
        if (!this.authenticationService.user) {
            return next.handle(req);
        } else {
            const user = this.authenticationService.user;
            req = req.clone({
                setHeaders: {
                    'Authorization': `Basic ${user.authData}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                }
            });

            return next.handle(req);
        }
    }
}
