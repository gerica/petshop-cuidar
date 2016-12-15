import { EnderecoService } from './../../../shared/service/pessoa/endereco.service';
import { Endereco } from './../../../shared/entity/pessoa/endereco';
import { Cidade } from './../../../shared/entity/utils/cidade';
import { Estado } from './../../../shared/entity/utils/estado';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { UtilsService } from './../../../shared/service/utils.service';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-cliente.component.html',
    providers: [UtilsService, PessoaService, EnderecoService]
})

export class CadastrarClienteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeClienteForm: boolean = true;
    activeEnderecoForm: boolean = true;
    pessoa: Pessoa;

    // Dados para a aba CADASTRO
    estados: Estado[];
    // estado: Estado;
    selectedEstado: string;
    cidades: Cidade[];
    // cidade: Cidade;
    selectedCidade: string;

    // Dados para a aba ENDEREÇO
    endereco: Endereco;
    enderecos: Endereco[];
    maskCEP = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];


    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,//
        private pessoaService: PessoaService,//
        private route: ActivatedRoute,//
        private enderecoService: EnderecoService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.pessoa = new Pessoa();
        this.endereco = new Endereco();
        this.recuperarEstados();
        this.route.params.subscribe(params => {
            if (params && params['idPessoa']) {
                this.recuperarPessoaPorId(params['idPessoa']);
                this.recuperarEnderecoPorPessoaId(params['idPessoa']);
            }
        });

    }

    public novo() {
        this.activeClienteForm = false;
        setTimeout(() => this.activeClienteForm = true, 0);
        this.pessoa = new Pessoa();
    }

    public novoEndereco() {
        this.activeEnderecoForm = false;
        setTimeout(() => this.activeEnderecoForm = true, 0);
        this.endereco = new Endereco();
        this.selectedEstado = null;
        this.selectedCidade = null;

    }

    /**
     * Grava novo cliente
     */
    public gravar(event: any): void {
        // if (event !== undefined)
        event.preventDefault();

        this.pessoaService.gravar(this.pessoa)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.pessoa = result.objeto;
                // this.novo();
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

    public gravarEndereco(event: any): void {
        event.preventDefault();
        this.enderecoService.gravar(this.endereco, this.pessoa.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarEnderecoPorPessoaId(this.pessoa.id);
                this.novoEndereco();

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


    public recuperarEstados(): void {
        this.utilsService.recuperarEstados()
            .subscribe(
            data => {
                this.estados = data.objeto;
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

    public recuperarCidadePorEstado(idEstado: number): void {
        this.utilsService.recuperarCidadePorEstado(idEstado)
            .subscribe(
            data => {
                this.cidades = data.objeto;
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

    public typeaheadOnSelect(e: any): void {
        // this.estado = e.item;
        this.recuperarCidadePorEstado(e.item.id);
        this.selectedCidade = null;

    }

    public typeaheadOnSelectCidade(e: any): void {
        // this.cidade = e.item;
        // console.log('Estado selecionado: ', this.estado);
        // console.log('Cidade selecionada: ', this.cidade);
        this.endereco.cidade = e.item;
    }

    public recuperarPessoaPorId(idPessoa: number): void {
        this.pessoaService.recuperarPessoaPorId(idPessoa)
            .subscribe(
            data => {
                this.pessoa = data.objeto;
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

    public carregarParaEdicaoEndereco(endereco: Endereco): void {
        this.endereco = endereco;
        this.selectedEstado = this.endereco.cidade.estado.descricao;
        this.selectedCidade = this.endereco.cidade.descricao;
    }

    set pessoaDtNascimento(e: any) {
        e = e.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        let dataLocal = new Date();
        dataLocal.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        this.pessoa.dtNascimento = dataLocal;
    }

    get pessoaDtNascimento() {
        let dataLocal = new Date(this.pessoa.dtNascimento);
        let ano = dataLocal.toLocaleDateString().substring(6, 10);
        let mes = dataLocal.toLocaleDateString().substring(3, 5);
        let dia = dataLocal.toLocaleDateString().substring(0, 2);
        return ano + '-' + mes + '-' + dia;
    }

}
