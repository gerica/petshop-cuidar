import { Component, OnInit } from '@angular/core';
import { BalancoHoje } from './balanco-hoje';
import { BalancoCarteira } from './balanco-carteira';
import { Operacao } from '../../shared/entity/operacao';
import { PapelService } from '../../shared/service/papel.service';
import { CotacaoService } from '../../shared/service/cotacao.service';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Home } from './home';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component( {
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [PapelService, CotacaoService]
})

export class HomeComponent implements OnInit {
    balancos: BalancoHoje[];
    balancosCarteira: BalancoCarteira[];
    balancoArray: any[];
    alertaUtil: AlertaUtil = new AlertaUtil();
    notifyAbriModal: Operacao;
    homeSaldo: Home;
    menorCotacao: number = 0;

    /*Construtor*/
    constructor( private papelService: PapelService, private cotacaoService: CotacaoService ) { }

    /*Métodos*/
    public ngOnInit(): void {
        this.recuperarBalancoHoje();
        //        this.criarGrafico();
        this.recuperarBalancoCarteira();
    }
    public recuperarBalancoHoje(): void {
        this.papelService.recuperarBalancoHoje()
            .subscribe(
            data => {
                this.balancos = data.objeto;
                this.calcularTotais();
            },
            error => {
                this.handleMessage( 'danger', error );
            }
            );
    }
    public showModalOperacaoSaida( operacao: Operacao ): void {
        this.notifyAbriModal = operacao;
    }
    /**
     * Método será chamado toda vez que o componete filho, marcado com @Output(), emitir algum sinal para ele.
     * Nesse caso o componete @Output() notifyFecharModal da classe OperacaoSaidaModalComponent.
     */
    public onNotifyFecharModal( message: any ): void {
        this.recuperarBalancoHoje();
        if ( message.type !== 'close' ) {
            this.handleMessage( message.type, message.msg );
        }
        this.notifyAbriModal = null;
    }


    public recuperarBalancoCarteira(): void {
        this.cotacaoService.recuperarBalancoCarteira()
            .subscribe(
            data => {
                this.balancosCarteira = data.objeto;

                this.balancoArray = [];
                for ( let obj of this.balancosCarteira ) {
                    if ( obj.lucroPrejuizo < this.menorCotacao ) {
                        this.menorCotacao = obj.lucroPrejuizo;
                    }
                    this.balancoArray.push( [obj.data, obj.lucroPrejuizo] );
                }

                this.criarGrafico();
            },
            error => {
                this.handleMessage( 'danger', error );
            }
            );
    }
    public criarGrafico(): void {
        var snowDepth: any = $( '#snow-depth' );
        snowDepth.highcharts( {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Desempenho Carteira: ',
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Valores'
                },
                min: this.menorCotacao
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f}%'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Carteira',
                // Define the data points. All series have a dummy year
                // of 2016/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: this.balancoArray
            }
            ]
        });
    }

    private handleMessage( tipo: string, message: string ) {
        this.alertaUtil.addMessage( {
            type: tipo,
            closable: true,
            msg: message
        });

    }
    private calcularTotais(): void {
        this.homeSaldo = new Home();
        let tempTotalInvesrimento: number = 0;
        let tempTotalSaldo: number = 0;


        for ( var i = 0; i < this.balancos.length; i++ ) {
            tempTotalInvesrimento += this.balancos[i].totalInvestimento;
            tempTotalSaldo += this.balancos[i].saldoLucroPrejuizo;
        }
        this.homeSaldo.totalInvestido = tempTotalInvesrimento;
        this.homeSaldo.saldoLucroPrejuizo = tempTotalSaldo;

        this.homeSaldo.saldoTotal = tempTotalSaldo - this.homeSaldo.totalInvestido;
        this.homeSaldo.porcentagem = ( this.homeSaldo.saldoTotal * 1 ) / this.homeSaldo.totalInvestido;

    }

}
