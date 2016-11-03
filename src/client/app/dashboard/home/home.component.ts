import { Component, OnInit } from '@angular/core';
import { BalancoHoje } from '../../shared/entity/balanco-hoje';
import { Operacao } from '../../shared/entity/operacao';
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
    notifyAbriModal: Operacao;

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
                    this.calcularTotais();
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
    public showModalOperacaoSaida(operacao: Operacao): void {
        this.notifyAbriModal = operacao;
    }
    private calcularTotais(): void {
        let tempTotalInvesrimento: number = 0;
        let tempTotalSaldo: number = 0;
        let tempBalanco: BalancoHoje = new BalancoHoje();

        for (var i = 0; i < this.balancos.length; i++) {
            tempTotalInvesrimento += this.balancos[i].totalInvestimento;
            tempTotalSaldo += this.balancos[i].saldoLucroPrejuizo;
        }
        tempBalanco.papel = 'Totais';
        tempBalanco.totalInvestimento = tempTotalInvesrimento;
        tempBalanco.saldoLucroPrejuizo = tempTotalSaldo;

        this.balancos[this.balancos.length] = tempBalanco;
    }

}
