import { Component, OnInit } from '@angular/core';
import { BalancoHoje } from '../../shared/entity/balanco-hoje';
import { PapelService } from '../../shared/service/papel.service';

import { AlertaUtil } from '../../shared/utils/alerta-util';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [PapelService]
})

export class HomeComponent implements OnInit {
    balancos: BalancoHoje[];
    alertaUtil: AlertaUtil = new AlertaUtil();

    /*Construtor*/
    constructor(private papelService: PapelService) {}

    /*Métodos*/
    public ngOnInit(): void {
        this.recuperarBalancoHoje();
    }
    public recuperarBalancoHoje(): void {
            this.papelService.recuperarBalancoHoje()
                .subscribe(
                    data => {
                        this.balancos = data.objeto;
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
        /*
        public recuperarUltimaCotacao(): void {
            for (var i = 0; i < this.operacoes.length; i++) {
                this.cotacaoService.recuperarUltimaCotacao(this.operacoes[i].papel.id)
                    .subscribe(
                        data => {
                            let cotacaoResult: Cotacao = data.objeto;
                            for (var i = 0; i < this.operacoes.length; i++) {
                                if (this.operacoes[i].papel.id === cotacaoResult.papel.id) {
                                    this.operacoes[i].ultimaCotacao = cotacaoResult;
                                }
                            }
                            this.calcularSaldoDiario();
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
        }
        private calcularSaldoDiario(): void {
            for (var i = 0; i < this.operacoes.length; i++) {
                if (this.operacoes[i].ultimaCotacao !== undefined) {
                    console.log(this.operacoes[i].ultimaCotacao.fechamento);
                    this.operacoes[i].saldoOperacao = (this.operacoes[i].ultimaCotacao.fechamento * this.operacoes[i].quantidade) -
                        (this.operacoes[i].precoUnitario * this.operacoes[i].quantidade);
                }
            }
        }*/

}
