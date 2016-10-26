import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService} from './login.service';
import { Usuario} from '../shared/entity/usuario';


/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent {
    usuario = new Usuario();
    msgErro: string;

    constructor(private loginSerice: LoginService, private router: Router) { }

    login(event): void {        
        event.preventDefault();            

         // Get all comments
         this.loginSerice.login(this.usuario)
                           .subscribe(
                               result => { 
                                   localStorage.setItem('id_token', result.token);
                                   this.router.navigate(['/dashboard/home']);                        
                               },
                                err => {
                                    // Log errors if any                                    
                                    this.msgErro = err;
                            });
                           
        // DESENVOLVER SEM O SERVIDOR
        this.router.navigate(['/dashboard/home']);                        
    }

    get diagnostic() { 
        return JSON.stringify(this.usuario); 
    }  
}
