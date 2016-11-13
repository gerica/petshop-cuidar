import { Component, OnInit } from '@angular/core';
import { CotacaoService } from '../../shared/service/cotacao.service';
import { PapelService } from '../../shared/service/papel.service';
import { Papel } from '../../shared/entity/papel';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { CotacaoGrafico } from './cotacao-grafico';

@Component( {
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cotacao-grafico.component.html',
    providers: [CotacaoService, PapelService]
})

export class CotacaoGraficoComponent implements OnInit {

    /*Variaveis*/
    papeis: Papel[];
    alertaUtil: AlertaUtil;
    papel: Papel;
    dataCotacoes: CotacaoGrafico[];
    cotacoesArray: any[];
    cotacaoMinimo: number;

    /*Construtor*/
    constructor( private cotacaoService: CotacaoService, private papelService: PapelService ) {
    }

    /*Métodos*/
    public ngOnInit(): void {
        this.alertaUtil = new AlertaUtil();
        this.recuperarPapeisAtivo();

    }

    public recuperarPapeisAtivo(): void {
        this.papelService.recuperarPapeisAtivo()
            .subscribe(
            data => {
                this.papeis = data;
            },
            error => {
                this.alertaUtil.addMessage( {
                    type: 'danger',
                    closable: true,
                    msg: error
                });
            });

    }

    public pesquisarGraficoPorCotacao( event: any ): void {
        event.preventDefault();
        this.cotacaoMinimo = undefined;
        this.cotacaoService.recuperarCotacoesPorPapel( this.papel.id )
            .subscribe(
            data => {
                this.dataCotacoes = data.objeto;
                this.cotacoesArray = [];
                for ( let cotacao of this.dataCotacoes ) {
                    if ( this.cotacaoMinimo === undefined ) {
                        this.cotacaoMinimo = cotacao.fechamento;
                    } else if ( cotacao.fechamento < this.cotacaoMinimo ) {
                        this.cotacaoMinimo = cotacao.fechamento;
                    }
                    this.cotacoesArray.push( [cotacao.data, cotacao.fechamento] );
                }

                this.criarGrafico();

                if ( this.dataCotacoes.length === 0 ) {
                    this.alertaUtil.addMessage( {
                        type: 'warning',
                        closable: true,
                        msg: 'O papel não possui nenhuma cotação.'
                    });
                } else {
                    this.alertaUtil.addMessage( {
                        type: 'success',
                        closable: true,
                        msg: data.message
                    });
                }
            },
            error => {
                this.alertaUtil.addMessage( {
                    type: 'danger',
                    closable: true,
                    msg: error
                });
            });

    }

    public criarGrafico(): void {
        var snowDepth: any = $( '#snow-depth' );
        snowDepth.highcharts( {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Cotação do papel: ' + this.papel.papel,
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
                min: this.cotacaoMinimo
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
                name: 'Cotação ' + this.papel.papel,
                // Define the data points. All series have a dummy year
                // of 2016/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: this.cotacoesArray
            }]
        });
    }


}
