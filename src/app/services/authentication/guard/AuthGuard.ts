import { UserService } from './../../../api/services/user.service';
import { AuthenticationService } from './../authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        console.log('can activate?');
        if (this.authenticationService.user) {
            return this.authenticationService.getAuthenticationObs().pipe(
                tap( res => {
                    console.log('now do we get a tap');
                    this.authenticationService.authenticateUser(res);
                }, err => {
                    this.authenticationService.handleAuthenticateUserFailure(err);
                }
                )
            );
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

}
