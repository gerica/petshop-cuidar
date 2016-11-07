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
        this.operacao.converterStringToDate();

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
    
    onKey(event:any) {
        console.log(event.keyCode);                
        if ((event.keyCode >= 48 && event.keyCode <= 57) || // números teclado superior
            (event.keyCode >= 96 && event.keyCode <= 105) ||// números teclado direito
            (event.keyCode >= 8 && event.keyCode <= 9) || // apagar e tab
            event.keyCode === 46 || // telacal del
            (event.keyCode >= 35 && event.keyCode <= 39) || // telca direita
            (event.keyCode >= 16 && event.keyCode <= 17) // shift e alt
            ) {
            this.operacao.precoUnitario = event.target.value;
        } else {
            if (this.operacao.precoUnitario.length >1) {
                this.operacao.precoUnitario = this.operacao.precoUnitario.substring(0,this.operacao.precoUnitario.length-1);
                
            } else {
                this.operacao.precoUnitario = '';

            }
        }

        if (this.operacao.precoUnitario.length >=1) {
            if (event.keyCode === 110 ) {
                let adicionar: boolean = true;
                for (var i = this.operacao.precoUnitario.length - 1; i >= 0; i--) {
                   if(this.operacao.precoUnitario.charAt(i) ===','){
                        adicionar = false;
                        break;
                   }
                }
                if (adicionar) {
                    this.operacao.precoUnitario = event.target.value;
                } 
            }
        }

    }
}
