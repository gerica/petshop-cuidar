import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaUtil } from '../shared/utils/alerta-util';
import { LoginService } from './login.service';
import { Usuario } from '../shared/entity/usuario';

/**
 *  This class represents the lazy loaded LoginComponent.
 */

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent {
    usuario = new Usuario();
    alertaUtil: AlertaUtil = new AlertaUtil();

    constructor(private loginSerice: LoginService, private router: Router) {}

    login(event: any): void {
        event.preventDefault();

        // Get all comments
        this.loginSerice.login(this.usuario)
            .subscribe(
                result => {
                    localStorage.setItem('id_token', result.token);
                    let usuarioLocal = result.usuario;
                    usuarioLocal.password = '';
                    localStorage.setItem('usuario_investimento', JSON.stringify(usuarioLocal));
                    this.router.navigate(['/dashboard/home']);
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err
                    });

                    //desenvovimento
                    this.router.navigate(['/dashboard/home']);
                });

        // DESENVOLVER SEM O SERVIDOR
        //         this.router.navigate(['/dashboard/home']);
    }

}
