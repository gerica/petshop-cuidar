import { Pessoa } from './../../../shared/entity/pessoa';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './listar-cliente.component.html',
    providers: [PessoaService]
})

export class ListarClienteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoas: Pessoa[];

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarPessoas();

    }

    public recuperarPessoas(): void {
        this.pessoaService.recuperarPessoas()
            .subscribe(
            data => {
                this.pessoas = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

}
