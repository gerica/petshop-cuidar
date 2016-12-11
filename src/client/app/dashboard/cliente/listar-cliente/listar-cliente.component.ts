import { Router } from '@angular/router';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
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
    @ViewChild('modalVisualizar') public modalVisualizar: ModalDirective;
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoas: Pessoa[];
    pessoaVisualizar: Pessoa;

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService,//
        private router: Router) {

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

    public showModalVisualizar(pessoa: Pessoa): void {
        this.pessoaVisualizar = pessoa;
        this.modalVisualizar.show();
    }

    public getPaginaEditar(pessoa: Pessoa): void {
        this.modalVisualizar.hide();
        if (pessoa !== undefined) {
            this.pessoaVisualizar = pessoa;
        }

        let body = JSON.stringify(this.pessoaVisualizar);
        this.router.navigate(['/dashboard/cadastrar-cliente', body]);
    }

}
