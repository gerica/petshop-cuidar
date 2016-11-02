import { Component, OnInit, OnChanges, Input, SimpleChange, ViewChild, Output, EventEmitter } from '@angular/core';
import { Operacao } from '../../shared/entity/operacao';
import { OperacaoSaida } from '../../shared/entity/operacao-saida';
import { OperacaoService } from '../../shared/service/operacao.service';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'tab-operacao-aberta',
    templateUrl: './operacao-aberta-tab.component.html',
    providers: [OperacaoService]
})

export class OperacaoAbertaTabComponent implements OnInit, OnChanges {
    @Input() atualizarListaEntradas = 0;
    @ViewChild('modalOperacaoSaida') public modalOperacaoSaida: ModalDirective;
    @ViewChild('modalOperacaoEditar') public modalOperacaoEditar: ModalDirective;
    @ViewChild('modalOperacaoExcluir') public modalOperacaoExcluir: ModalDirective;
    @Output() notifyAlerta: EventEmitter < any > = new EventEmitter < any > ();
    @Output() notifyOperacaoSaida: EventEmitter < any > = new EventEmitter < any > ();
    operacoes: Operacao[];
    activeOperacaoSaidaForm = true;
    operacaoModal: Operacao;
    operacaoSaida: OperacaoSaida;


    /*Construtor*/
    constructor(private operacaoService: OperacaoService) {}

    /*Métodos*/
    public ngOnInit(): void {
        // this.recuperarOperacaoEntradaAberta();
    }
    public ngOnChanges(changes: {
        [propKey: string]: SimpleChange
    }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to = JSON.stringify(changedProp.currentValue);
            if (from !== to) {
                this.recuperarOperacaoEntradaAberta();
                break;
            }

        };
    }
    public notifyAlertaEmit(message: any) {
        this.notifyAlerta.emit(message);
    }
    public notifyOperacaoSaidaEmit(message: any) {
        this.notifyOperacaoSaida.emit(message);
    }
    public recuperarOperacaoEntradaAberta(): void {
        this.operacaoService.recuperarOperacaoEntradaAberta()
            .subscribe(
                data => {
                    this.operacoes = data;
                },
                error => {
                    this.notifyAlertaEmit({
                        type: 'danger',
                        closable: true,
                        msg: error
                    });
                }
            );
    }
    public gravarOperacaoSaida(event: any): void {
        event.preventDefault();
        this.operacaoService.gravarOperacaoSaida(this.operacaoSaida)
            .subscribe(
                result => {
                    this.recuperarOperacaoEntradaAberta();
                    this.novaOperacaoSaida();
                    this.modalOperacaoSaida.hide();

                    this.notifyOperacaoSaidaEmit('atualizar lista de operações de saída');
                    this.notifyAlertaEmit({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.notifyAlertaEmit({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }
    public novaOperacaoSaida() {
        this.activeOperacaoSaidaForm = false;
        setTimeout(() => this.activeOperacaoSaidaForm = true, 0);
    }
    public showModalOperacaoEditar(operacao: Operacao): void {
        this.operacaoModal = new Operacao();

        this.operacaoModal.id = operacao.id;
        this.operacaoModal.data = operacao.data;
        this.operacaoModal.papel = operacao.papel;
        this.operacaoModal.tipoOperacao = operacao.tipoOperacao;
        this.operacaoModal.precoUnitario = operacao.precoUnitario;
        this.operacaoModal.quantidade = operacao.quantidade;
        this.operacaoModal.despesa = operacao.despesa;
        this.operacaoModal.observacao = operacao.observacao;
        this.modalOperacaoEditar.show();
    }

    public showModalOperacaoExcluir(operacao: Operacao): void {
        this.operacaoModal = operacao;
        this.notifyOperacaoSaidaEmit('atualizar lista de operações de saída');
        this.modalOperacaoExcluir.show();
    }

    public showModalOperacaoSaida(operacao: Operacao): void {
        this.operacaoSaida = new OperacaoSaida();
        this.operacaoSaida.operacaoEntrada = operacao;
        this.operacaoSaida.operacaoEntrada.papel = operacao.papel;
        this.operacaoSaida.quantidade = operacao.quantidade;
        if ('Comprar' === operacao.tipoOperacao) {
            this.operacaoSaida.tipoOperacao = 'Vender';
        } else {
            this.operacaoSaida.tipoOperacao = 'Comprar';
        }
        this.modalOperacaoSaida.show();
    }

    public excluirOperacaoEntrada(event: any): void {
        event.preventDefault();
        this.operacaoService.excluirOperacaoEntrada(this.operacaoModal)
            .subscribe(
                result => {
                    this.recuperarOperacaoEntradaAberta();
                    this.modalOperacaoExcluir.hide();

                    this.notifyAlertaEmit({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.notifyAlertaEmit({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }

    public editarOperacaoEntrada(event: any): void {
        event.preventDefault();

        this.operacaoService.editarOperacaoEntrada(this.operacaoModal)
            .subscribe(
                result => {
                    this.recuperarOperacaoEntradaAberta();
                    this.modalOperacaoEditar.hide();
                    this.notifyAlertaEmit({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.notifyAlertaEmit({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }


    set operacaoModalData(e: any) {
        e = e.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        let dataOperacaoLocal = new Date();
        dataOperacaoLocal.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

        this.operacaoModal.data = dataOperacaoLocal;
    }

    get operacaoModalData() {
        let dataOperacaoLocal = new Date(this.operacaoModal.data);
        let ano = dataOperacaoLocal.toLocaleDateString().substring(6, 10);
        let mes = dataOperacaoLocal.toLocaleDateString().substring(3, 5);
        let dia = dataOperacaoLocal.toLocaleDateString().substring(0, 2);
        return ano + '-' + mes + '-' + dia;
    }



}
