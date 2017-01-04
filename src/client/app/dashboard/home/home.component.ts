import { OrcamentoService } from './../../shared/service/venda/orcamento.service';
import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ActivatedRoute } from '@angular/router';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [OrcamentoService]
})

export class HomeComponent implements OnInit {
    alertaUtil: AlertaUtil = new AlertaUtil();
    sub: any;
    qtdOrcamento: number;

    constructor(private route: ActivatedRoute,
        private orcamentoService: OrcamentoService) { }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (params && params['desc']) {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: params['desc']
                });
            }
        });
        this.recuperarQuantidadeOrcamento();
    }

    public recuperarQuantidadeOrcamento(): void {
        this.orcamentoService.recuperarQuantidadeOrcamento()
            .subscribe(
            data => {
                this.qtdOrcamento = data.objeto;
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            }
            );
    }
}
