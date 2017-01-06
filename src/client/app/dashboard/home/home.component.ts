import { Usuario } from './../../shared/entity/authority/usuario';
import { RoleEnum } from './../../shared/entity/authority/roleEnum';
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

    // Roles
    isAdmin = false;// ADMIN
    isConvidado = false;//"CONVIDADO"
    isFinanceiro = false;//"FINANCEIRO"
    isEstoque = false;//"ESTOQUE"
    isRelacionamento = false;//"RELACIONAMENTO"
    isVenda = false;//"VENDA"

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
        this.checkRole(JSON.parse(localStorage.getItem('usuario_')));
        this.recuperarQuantidadeOrcamento();

    }

    public recuperarQuantidadeOrcamento(): void {
        if (this.isAdmin || this.isVenda) {
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

    private checkRole(usuario: Usuario): void {
        if (usuario) {
            usuario.authorities.forEach((element) => {
                if (element.authority === RoleEnum[RoleEnum.ADMIN]) {
                    this.isAdmin = true;
                }
                if (element.authority === RoleEnum[RoleEnum.CONVIDADO]) {
                    this.isConvidado = true;
                }
                if (element.authority === RoleEnum[RoleEnum.FINANCEIRO]) {
                    this.isFinanceiro = true;
                }
                if (element.authority === RoleEnum[RoleEnum.ESTOQUE]) {
                    this.isEstoque = true;
                }
                if (element.authority === RoleEnum[RoleEnum.RELACIONAMENTO]) {
                    this.isRelacionamento = true;
                }
                if (element.authority === RoleEnum[RoleEnum.VENDA]) {
                    this.isVenda = true;
                }
            });
        }
    }
}
