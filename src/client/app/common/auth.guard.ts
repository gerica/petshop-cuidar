import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

    // desenvolvimento
    private semServidor = true;

    constructor(private router: Router) {}

    canActivate() {
        if (this.semServidor) {
            return true;
        }

        //return tokenExistsAndNotExpired();
        if (tokenNotExpired()) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}
