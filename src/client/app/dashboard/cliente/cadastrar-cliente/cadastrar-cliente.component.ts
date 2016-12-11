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
    estados: Estado[];
    estado: Estado;
    selectedEstado: string;
    cidades: Cidade[];
    cidade: Cidade;
    selectedCidade: Cidade;

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
        this.recuperarEstados();
        this.route.params.subscribe(params => {
            if (params && params['pessoa']) {
                console.log(params['pessoa']);
                this.pessoa = JSON.parse(params['pessoa']);

            }

            // In a real app: dispatch action to load the details here.
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

}
