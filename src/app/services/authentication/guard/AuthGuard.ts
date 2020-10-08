import { AuthenticationService } from './../authentication.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        console.log('can activate?');
        if (this.authenticationService.user) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

}
