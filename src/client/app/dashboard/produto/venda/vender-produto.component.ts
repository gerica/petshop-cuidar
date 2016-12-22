import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [PessoaService]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup = new FormGroup({
        clienteControl: this.clienteControl
    });
    cliente: Pessoa;

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        console.log('inicio');
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
        this.cliente = cliente;
        console.log('Cliente: ', this.cliente);
    }
}
