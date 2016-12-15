import { EnderecoService } from './../../../shared/service/pessoa/endereco.service';
import { Endereco } from './../../../shared/entity/pessoa/endereco';
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
    providers: [PessoaService, EnderecoService]
})

export class ListarClienteComponent implements OnInit {
    /*Variaveis*/
    @ViewChild('modalVisualizar') public modalVisualizar: ModalDirective;
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoas: Pessoa[];
    pessoaVisualizar: Pessoa;
    enderecos: Endereco[];

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService,//
        private router: Router,
        private enderecoService: EnderecoService) {

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
        this.recuperarEnderecoPorPessoaId(pessoa.id);
        this.modalVisualizar.show();
    }

    public getPaginaEditar(pessoa: Pessoa): void {
        this.modalVisualizar.hide();
        if (pessoa !== undefined) {
            this.pessoaVisualizar = pessoa;
        }

        this.router.navigate(['/dashboard/cadastrar-cliente', this.pessoaVisualizar.id]);
    }

    public recuperarEnderecoPorPessoaId(idPessoa: number): void {
        this.enderecoService.recuperarEnderecoPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.enderecos = data.objeto;
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
