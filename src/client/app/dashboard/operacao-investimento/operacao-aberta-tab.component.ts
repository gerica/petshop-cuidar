import { Component, OnChanges, Input, SimpleChange, ViewChild, Output, EventEmitter } from '@angular/core';
import { Operacao } from '../../shared/entity/operacao';
import { Cotacao } from '../../shared/entity/cotacao';
import { OperacaoService } from '../../shared/service/operacao.service';
import { ConfiguracaoAnaliseCotacoes } from '../../shared/entity/configuracaoAnaliseCotacoes';
import { ConfiguracaoAnaliseCotacaoService } from '../../shared/service/configuracao-analise-cotacao.service';
import { CotacaoService } from '../../shared/service/cotacao.service';;
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component( {
    moduleId: module.id,
    selector: 'tab-operacao-aberta',
    templateUrl: './operacao-aberta-tab.component.html',
    providers: [OperacaoService, ConfiguracaoAnaliseCotacaoService, CotacaoService]
})

export class OperacaoAbertaTabComponent implements OnChanges {
    @Input() atualizarListaEntradas = 0;
    @ViewChild( 'modalOperacaoEditar' ) public modalOperacaoEditar: ModalDirective;
    @ViewChild( 'modalOperacaoExcluir' ) public modalOperacaoExcluir: ModalDirective;
    @ViewChild( 'modalStopLossGain' ) public modalStopLossGain: ModalDirective;
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyOperacaoSaida: EventEmitter<any> = new EventEmitter<any>();
    operacoes: Operacao[];
    operacaoModal: Operacao;
    notifyAbriModal: Operacao;
    stopLoss: number;
    stopGain: number;
    private configuracaoAnaliseCotacoes: ConfiguracaoAnaliseCotacoes;
    private cotacaoOperacaoEntrada: Cotacao;

    /*Construtor*/
    constructor( private operacaoService: OperacaoService, //
        private configService: ConfiguracaoAnaliseCotacaoService,//
        private cotacaoService: CotacaoService ) { }

    /*Métodos*/
    /**
     * Método que é chamado toda vez que o objeto com @Input sofrer alguma alteração.
     * Nesse caso o objeto é: atualizarListaEntradas
     */
    public ngOnChanges( changes: {
        [propKey: string]: SimpleChange
    }) {
        for ( let propName in changes ) {
            let changedProp = changes[propName];
            let from = JSON.stringify( changedProp.previousValue );
            let to = JSON.stringify( changedProp.currentValue );
            if ( from !== to ) {
                this.recuperarOperacaoEntradaAberta();
                break;
            }

        };
    }
    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * OperacaoInvestimentoComponent.onNotifyAlerta()
     */
    public notifyAlertaEmit( message: any ) {
        this.notifyAlerta.emit( message );
    }
    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * OperacaoInvestimentoComponent.onNotifyOperacaoSaidaReceber()
     */
    public notifyOperacaoSaidaEmit( message: any ) {
        this.notifyOperacaoSaida.emit( message );
    }
    /**
     * Método será chamado toda vez que o componete filho, marcado com @Output(), emitir algum sinal para ele.
     * Nesse caso o componete @Output() notifyFecharModal da classe OperacaoSaidaModalComponent.
     */
    public onNotifyFecharModal( message: any ): void {
        this.recuperarOperacaoEntradaAberta();
        this.notifyAbriModal = null;
        this.notifyOperacaoSaidaEmit( 'atualizar lista de operações de saída' );
        if ( message.type !== 'close' ) {
            this.notifyAlertaEmit( {
                type: message.type,
                closable: true,
                msg: message.msg
            });
        }

    }
    public recuperarOperacaoEntradaAberta(): void {
        this.operacaoService.recuperarOperacaoEntradaAberta()
            .subscribe(
            data => {
                this.operacoes = data.objeto;
            },
            error => {
                this.notifyAlertaEmit( {
                    type: 'danger',
                    closable: true,
                    msg: error
                });
            }
            );
    }
    public showModalOperacaoEditar( operacao: Operacao ): void {
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

    public showModalOperacaoExcluir( operacao: Operacao ): void {
        this.operacaoModal = operacao;
        this.notifyOperacaoSaidaEmit( 'atualizar lista de operações de saída' );
        this.modalOperacaoExcluir.show();
    }

    public showModalOperacaoSaida( operacao: Operacao ): void {
        this.notifyAbriModal = operacao;
    }
    public showModalStopLossGain( operacao: Operacao ): void {
        this.operacaoModal = operacao;
        this.recuperarConfiguracaoAnalise();
        this.modalStopLossGain.show();
    }

    public excluirOperacaoEntrada( event: any ): void {
        event.preventDefault();
        this.operacaoService.excluirOperacaoEntrada( this.operacaoModal )
            .subscribe(
            result => {
                this.recuperarOperacaoEntradaAberta();
                this.modalOperacaoExcluir.hide();

                this.notifyAlertaEmit( {
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit( {
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });
            });
    }
    public editarOperacaoEntrada( event: any ): void {
        event.preventDefault();

        this.operacaoService.editarOperacaoEntrada( this.operacaoModal )
            .subscribe(
            result => {
                this.recuperarOperacaoEntradaAberta();
                this.modalOperacaoEditar.hide();
                this.notifyAlertaEmit( {
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit( {
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });
            });
    }
    public recuperarConfiguracaoAnalise(): void {
        this.configService.recuperarConfiguracaoAnalise()
            .subscribe(
            result => {
                this.configuracaoAnaliseCotacoes = result.objeto;
                //                this.recuperarCotacaoPorData( this.operacaoModal.data );
                this.calcularStopLossGain();
            },
            error => {
                this.notifyAlertaEmit( {
                    type: 'danger',
                    closable: true,
                    msg: error.message
                });
            }
            );
    }
    public recuperarCotacaoPorData( data: Date ): void {
        this.cotacaoService.recuperarCotacaoPorData( data )
            .subscribe(
            result => {
                this.cotacaoOperacaoEntrada = result.objeto;
                this.calcularStopLossGain();
            },
            error => {
                this.notifyAlertaEmit( {
                    type: 'danger',
                    closable: true,
                    msg: error.message
                });
            }
            );
    }

    set operacaoModalData( e: any ) {
        e = e.split( '-' );
        let d = new Date( Date.UTC( e[0], e[1] - 1, e[2] ) );
        let dataOperacaoLocal = new Date();
        dataOperacaoLocal.setFullYear( d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() );
        this.operacaoModal.data = dataOperacaoLocal;
    }

    get operacaoModalData() {
        let dataOperacaoLocal = new Date( this.operacaoModal.data );
        let ano = dataOperacaoLocal.toLocaleDateString().substring( 6, 10 );
        let mes = dataOperacaoLocal.toLocaleDateString().substring( 3, 5 );
        let dia = dataOperacaoLocal.toLocaleDateString().substring( 0, 2 );
        return ano + '-' + mes + '-' + dia;
    }
    public calcularStopLossGain(): void {
        if ( this.operacaoModal !== undefined && this.operacaoModal !== null &&//
            this.configuracaoAnaliseCotacoes !== undefined && this.configuracaoAnaliseCotacoes !== null ) {
            //            this.cotacaoOperacaoEntrada !== undefined && this.cotacaoOperacaoEntrada !== null 

            if ( this.configuracaoAnaliseCotacoes.riscoStopLoss !== undefined && this.configuracaoAnaliseCotacoes.riscoStopLoss !== null ) {
                this.configuracaoAnaliseCotacoes.riscoStopLoss = this.configuracaoAnaliseCotacoes.riscoStopLoss / 100;
                this.stopLoss = this.operacaoModal.precoUnitario - (//
                    this.configuracaoAnaliseCotacoes.riscoStopLoss * this.operacaoModal.precoUnitario );
            }
            if ( this.configuracaoAnaliseCotacoes.riscoStopWin !== undefined && this.configuracaoAnaliseCotacoes.riscoStopWin !== null ) {
                this.configuracaoAnaliseCotacoes.riscoStopWin = this.configuracaoAnaliseCotacoes.riscoStopWin / 100;
                this.stopGain = this.operacaoModal.precoUnitario + ( //
                    this.configuracaoAnaliseCotacoes.riscoStopWin * this.operacaoModal.precoUnitario );
            }
        }

    }
}
