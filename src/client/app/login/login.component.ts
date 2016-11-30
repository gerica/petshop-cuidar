import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaUtil } from '../shared/utils/alerta-util';
import { LoginService } from './login.service';
import { Usuario } from '../shared/entity/usuario';
import { ActivatedRoute } from '@angular/router';

/**
 *  This class represents the lazy loaded LoginComponent.
 */

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    usuario = new Usuario();
    alertaUtil: AlertaUtil = new AlertaUtil();
    private sub: any;

    constructor(private loginSerice: LoginService, private router: Router, private route: ActivatedRoute) { }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            // this.id = +params['id']; // (+) converts string 'id' to a number
            console.log(params);
            if (params && params['desc']) {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: params['desc']
                });
            }

            // In a real app: dispatch action to load the details here.
        });
    }

    login(event: any): void {
        event.preventDefault();

        // Get all comments
        this.loginSerice.login(this.usuario)
            .subscribe(
            result => {
                localStorage.setItem('id_token', result.token);
                let usuarioLocal = result.usuario;
                usuarioLocal.password = '';
                localStorage.setItem('usuario_petshop', JSON.stringify(usuarioLocal));
                this.router.navigate(['/dashboard/home', 'teste para ver']);
            },
            err => {
                // Log errors if any
                if (err.objeto === "locked") {
                    this.router.navigate(['/primeiro-login']);
                }
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });

                //desenvovimento
                // this.router.navigate(['/dashboard/home']);
            });
    }

}
