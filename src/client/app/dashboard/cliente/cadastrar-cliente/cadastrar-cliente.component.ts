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
    providers: [UtilsService, PessoaService]
})

export class CadastrarClienteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoa: Pessoa;
    maskCEP = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]


    // Dados para a aba CADASTRO
    estados: Estado[];
    estado: Estado;
    selectedEstado: string;
    cidades: Cidade[];
    cidade: Cidade;
    selectedCidade: Cidade;

    // Dados para a aba ENDEREÇO
    endereco: Endereco;

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,//
        private pessoaService: PessoaService,
        private route: ActivatedRoute) {

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
            }
        });

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.pessoa = new Pessoa();
    }

    /**
     * Grava novo usuário
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
        this.estado = e.item;
        this.recuperarCidadePorEstado(this.estado.id);
        this.selectedCidade = null;

    }

    public typeaheadOnSelectCidade(e: any): void {
        this.cidade = e.item;
        console.log('Estado selecionado: ', this.estado);
        console.log('Cidade selecionada: ', this.cidade);
    }

    recuperarPessoaPorId(idPessoa: number): void {
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
