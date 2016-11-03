import { Component, OnInit } from '@angular/core';
import { Papel } from '../../shared/entity/papel';
import { Operacao } from '../../shared/entity/operacao';
import { PapelService } from '../../shared/service/papel.service';
import { OperacaoService } from '../../shared/service/operacao.service';
import { AlertaUtil } from '../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './operacao-investimento.component.html',
    providers: [PapelService, OperacaoService]
})

export class OperacaoInvestimentoComponent implements OnInit {

    /*Variaveis*/
    papeis: Papel[];
    operacao: Operacao;
    alertaUtil: AlertaUtil;
    activeOperacaoForm = true;
    atualizarListaEntradas = 0;
    atualizarListaSaidas = 0;

    /*Construtor*/
    constructor(private operacaoService: OperacaoService, private papelService: PapelService) {}

    /*Métodos*/
    public ngOnInit(): void {
        this.novaOperacao();
        this.recuperarPapeisAtivo();

    }
    public novaOperacao() {
        this.operacao = new Operacao();
        this.alertaUtil = new AlertaUtil();
        this.activeOperacaoForm = false;
        setTimeout(() => this.activeOperacaoForm = true, 0);
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
                    this.atualizarListaEntradas++;
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
    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }
    public onNotifyOperacaoSaidaReceber(message: any): void {
        this.atualizarListaSaidas++;
    }
}
