import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../shared/service/usuario.service';
import { PapelService } from '../../shared/service/papel.service';

import { Papel } from '../../shared/entity/papel';

import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './usuario-configuracao.component.html',
    providers: [UsuarioService, PapelService]
})

export class UsuarioConfiguracaoComponent implements OnInit {

    /*Variaveis*/
    papeis: Papel[];
    alertaUtil: AlertaUtil;
    usuario: Usuario;

    /*Construtor*/
    constructor(private usuarioService: UsuarioService, private papelService: PapelService) {
        this.alertaUtil = new AlertaUtil();
        this.usuario = JSON.parse(localStorage.getItem('usuario_investimento'));
    }

    /*Métodos*/
    ngOnInit(): void {
        this.recuperarTodosPapeis();
        // this.getAllOperacaoEntrada();
    }

        recuperarTodosPapeis(): void {
        this.papelService.recuperarTodosPapeis()
            .subscribe(
                data => {
                    this.papeis = data;
                    console.log('Sucesso recuperarTodosPapeis().');
                },
                error => {
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: error
                    });
                }
            );
    }

        alterarUsuario(event: any): void {
        event.preventDefault();

        this.usuarioService.alterarUsuario(this.usuario)
            .subscribe(
                result => {
                    let usuarioLocal = result.objeto;
                    usuarioLocal.password = '';
                    localStorage.setItem('usuario_investimento', JSON.stringify(usuarioLocal));
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
                        msg: err.message
                    });
                });
    }

        ativarDesativarPapel(papel: Papel): void {
        this.papelService.ativarDesativarPapel(papel)
            .subscribe(
                result => {
                    // this.recuperarTodosPapeis();
                    papel.ativo = !papel.ativo;
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                    console.log('Sucesso ativarDesativarPapel().' + papel.papel);
                },
                error => {
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: error.message
                    });
                }
            );
    }

}
