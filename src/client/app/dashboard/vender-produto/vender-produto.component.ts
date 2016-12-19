import { PessoaService } from './../../shared/service/pessoa/pessoa.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from './../../shared/service/utils.service';
import { Pessoa } from './../../shared/entity/pessoa/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [UtilsService, PessoaService]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup = new FormGroup({
        clienteControl: this.clienteControl
    });

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,
        private pessoaService: PessoaService) {

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
        //         });ReactiveFormsModule
        //     });
    }

    public onSelectedCliene(cliente: Pessoa): void {
        console.log('Cliente: ', cliente);
    }
}
