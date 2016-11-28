import { UsuarioService } from './../../shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-usuario.component.html',
    providers: [UsuarioService]
})

export class CadastrarUsuarioComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    usuario: Usuario;

    /*Construtor*/
    constructor(private usuarioService: UsuarioService) {

    }

    /*Métodos*/
    public ngOnInit(): void {
        this.usuario = new Usuario();
    }

    public gravar(event: any): void {
        event.preventDefault();

        this.usuarioService.incluirUsuario(this.usuario)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }

}
