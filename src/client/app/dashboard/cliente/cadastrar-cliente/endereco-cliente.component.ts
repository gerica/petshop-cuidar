import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { EnderecoService } from './../../../shared/service/pessoa/endereco.service';
import { Endereco } from './../../../shared/entity/pessoa/endereco';
import { Cidade } from './../../../shared/entity/utils/cidade';
import { Estado } from './../../../shared/entity/utils/estado';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../../shared/service/utils.service';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'tab-endereco-cliente',
    templateUrl: './endereco-cliente.component.html',
    providers: [UtilsService, EnderecoService]
})

export class EnderecoClienteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() pessoa: Pessoa;
    @ViewChild('modalExcluirEndereco') public modalExcluirEndereco: ModalDirective;
    activeEnderecoForm: boolean = true;

    // Dados para a aba CADASTRO
    estados: Estado[];
    // estado: Estado;
    selectedEstado: string;
    cidades: Cidade[];
    // cidade: Cidade;
    selectedCidade: string;

    // Dados para a aba ENDEREÇO
    endereco: Endereco;
    enderecoExcluir: Endereco;
    enderecos: Endereco[];
    maskCEP = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];


    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,//
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

    /**
     * Método que é chamado toda vez que o objeto com @Input sofrer alguma alteração.
     * Nesse caso o objeto é: pessoa
     */
    public ngOnChanges(changes: {
        [propKey: string]: SimpleChange
    }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to = JSON.stringify(changedProp.currentValue);
            this.pessoa = JSON.parse(to);

        };
    }

    public novo() {
        this.activeEnderecoForm = false;
        setTimeout(() => this.activeEnderecoForm = true, 0);
        this.endereco = new Endereco();
        this.selectedEstado = null;
        this.selectedCidade = null;
    }

    public gravar(event: any): void {
        event.preventDefault();
        this.enderecoService.gravar(this.endereco, this.pessoa.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarEnderecoPorPessoaId(this.pessoa.id);
                this.novo();

            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }

    public excluir(event: any): void {
        event.preventDefault();
        this.enderecoService.excluir(this.endereco.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarEnderecoPorPessoaId(this.pessoa.id);
                this.novo();

            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
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
                this.notifyAlertaEmit({
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
                this.notifyAlertaEmit({
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
                this.notifyAlertaEmit({
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
                this.notifyAlertaEmit({
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
    /**
 * Método que quando acionado chamará um método no componente pai. 
 * Nesse caso chamará
 * OperacaoInvestimentoComponent.onNotifyAlerta()
 */
    public notifyAlertaEmit(message: any) {
        this.notifyAlerta.emit(message);
    }

    public showModalExcluir(): void {
        this.enderecoExcluir = this.endereco;
        this.modalExcluirEndereco.show();
    }
}
