import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-cliente.component.html',
    providers: []
})

export class CadastrarClienteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;

    /**
     * Construtor
     */
    constructor() {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        // this.usuarioService.incluirUsuario(this.usuario, this.rolesSelected)
        //     .subscribe(
        //     result => {
        //         this.recuperarUsuariosAtivo();
        //         this.alertaUtil.addMessage({
        //             type: 'success',
        //             closable: true,
        //             msg: result.message
        //         });
        //         this.novo();
        //     },
        //     err => {
        //         // Log errors if any
        //         this.alertaUtil.addMessage({
        //             type: 'danger',
        //             closable: true,
        //             msg: err.message === undefined ? err : err.message
        //         });
        //     });
    }

}
