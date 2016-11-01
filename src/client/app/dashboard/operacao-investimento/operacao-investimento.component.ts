import { Component, OnInit, ViewChild } from '@angular/core';


import { Papel } from '../../shared/entity/papel';
import { Operacao } from '../../shared/entity/operacao';
import { OperacaoSaida } from '../../shared/entity/operacao-saida';

import { PapelService } from '../../shared/service/papel.service';
import { OperacaoService } from '../../shared/service/operacao.service';

import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './operacao-investimento.component.html',
    providers: [PapelService, OperacaoService]
})

export class OperacaoInvestimentoComponent implements OnInit {
    @ViewChild('modalOperacaoSaida') public modalOperacaoSaida: ModalDirective;
    @ViewChild('modalOperacaoEditar') public modalOperacaoEditar: ModalDirective;
    @ViewChild('modalOperacaoExcluir') public modalOperacaoExcluir: ModalDirective;

    /*Variaveis*/
    papeis: Papel[];
    operacao: Operacao;
    operacaoModal: Operacao;
    operacaoSaida: OperacaoSaida;
    alertaUtil: AlertaUtil;
    operacoes: Operacao[];
    activeOperacaoForm = true;
    activeOperacaoSaidaForm = true;
    atualizarListaSaidas = 0;

    /*Construtor*/
    constructor(private operacaoService: OperacaoService, private papelService: PapelService) {}

    /*Métodos*/
    public ngOnInit(): void {
        this.novaOperacao();
        this.recuperarPapeisAtivo();
        this.recuperarOperacaoEntradaAberta();
    }

    public novaOperacao() {
        this.operacao = new Operacao();
        this.alertaUtil = new AlertaUtil();
        this.activeOperacaoForm = false;
        setTimeout(() => this.activeOperacaoForm = true, 0);
    }

    public novaOperacaoSaida() {
        this.activeOperacaoSaidaForm = false;
        setTimeout(() => this.activeOperacaoSaidaForm = true, 0);
    }

    public recuperarPapeisAtivo(): void {
        this.papelService.recuperarPapeisAtivo()
            .subscribe(
                data => {
                    this.papeis = data;
                },
                error => {
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: error
                    });
                });

    }

    public gravarOperacaoEntrada(event: any): void {
        event.preventDefault();

        this.operacaoService.gravarOperacaoEntrada(this.operacao)
            .subscribe(
                result => {
                    this.recuperarOperacaoEntradaAberta();
                    this.novaOperacao();
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }

    public gravarOperacaoSaida(event: any): void {
        event.preventDefault();
        this.operacaoService.gravarOperacaoSaida(this.operacaoSaida)
            .subscribe(
                result => {
                    this.recuperarOperacaoEntradaAberta();
                    this.novaOperacaoSaida();
                    this.atualizarListaSaidas++;
                    this.modalOperacaoSaida.hide();

                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }

    public recuperarOperacaoEntradaAberta(): void {
        this.operacaoService.recuperarOperacaoEntradaAberta()
            .subscribe(
                data => {
                    this.operacoes = data;
                    this.calcularCamposOperacao();
                },
                error => {
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: error
                    });
                }
            );
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
        console.log("tem que chamar")
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

                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
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
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
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

    private calcularCamposOperacao(): void {
        // for (var i = 0; i < this.operacoes.length; i++) {
        //     this.operacoes[i].totalOperacao = (this.operacoes[i].quantidade * this.operacoes[i].precoUnitario) + this.operacoes[i].despesa;
        // }
    }
}
