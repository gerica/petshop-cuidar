import { Component, OnInit } from '@angular/core';
import { BalancoHoje } from '../../shared/entity/balanco-hoje';
import { Operacao } from '../../shared/entity/operacao';
import { PapelService } from '../../shared/service/papel.service';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Home } from './home';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component( {
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [PapelService]
})

export class HomeComponent implements OnInit {
    balancos: BalancoHoje[];
    alertaUtil: AlertaUtil = new AlertaUtil();
    notifyAbriModal: Operacao;
    homeSaldo: Home;

    /*Construtor*/
    constructor( private papelService: PapelService ) { }

    /*Métodos*/
    public ngOnInit(): void {
        this.recuperarBalancoHoje();
        this.criarGrafico();
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

    }
    private handleMessage( tipo: string, message: string ) {
        this.alertaUtil.addMessage( {
            type: tipo,
            closable: true,
            msg: message
        });

    }
    
    public criarGrafico(): void {
        var snowDepth: any = $( '#snow-depth' );
        snowDepth.highcharts( {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Cotação do papel: ' ,
            },
            subtitle: {
                text: 'período entre'
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
                min: -5
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: R$ {point.y:.2f}'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Winter 2012-2013',
                // Define the data points. All series have a dummy year
                // of 2016/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                    [Date.UTC(2016, 9, 21), 0],
                    [Date.UTC(2016, 10, 4), -0.28],
                    [Date.UTC(2016, 10, 9), 0.25],
                    [Date.UTC(2016, 10, 27), 0.2],
                    [Date.UTC(2016, 11, 2), 0.28],
                    [Date.UTC(2016, 11, 26), 0.28],
                    [Date.UTC(2016, 11, 29), 0.47],
                    [Date.UTC(2017, 0, 11), 0.79],
                    [Date.UTC(2017, 0, 26), 0.72],
                    [Date.UTC(2017, 1, 3), -1.02],
                    [Date.UTC(2017, 1, 11), 1.12],
                    [Date.UTC(2017, 1, 25), 1.2],
                    [Date.UTC(2017, 2, 11), 1.18],
                    [Date.UTC(2017, 3, 11), 1.19],
                    [Date.UTC(2017, 4, 1), 1.85],
                    [Date.UTC(2017, 4, 5), -2.22],
                    [Date.UTC(2017, 4, 19), 1.15],
                    [Date.UTC(2017, 5, 3), 0]
                ]
            }, {
                name: 'Winter 2013-2014',
                data: [
                    [Date.UTC(2016, 9, 29), 0],
                    [Date.UTC(2016, 10, 9), 0.4],
                    [Date.UTC(2016, 11, 1), 0.25],
                    [Date.UTC(2017, 0, 1), -1.66],
                    [Date.UTC(2017, 0, 10), 1.8],
                    [Date.UTC(2017, 1, 19), 1.76],
                    [Date.UTC(2017, 2, 25), 2.62],
                    [Date.UTC(2017, 3, 19), -2.41],
                    [Date.UTC(2017, 3, 30), -2.05],
                    [Date.UTC(2017, 4, 14), 1.7],
                    [Date.UTC(2017, 4, 24), 1.1],
                    [Date.UTC(2017, 5, 10), 0]
                ]
            }
            ]
        });
    }

}
