import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../shared/service/usuario.service';
import { PapelService } from '../../shared/service/papel.service';
import { ConfiguracaoAnaliseCotacaoService } from '../../shared/service/configuracao-analise-cotacao.service';
import { CotacaoService } from '../../shared/service/cotacao.service';

import { Papel } from '../../shared/entity/papel';
import { ConfiguracaoAnaliseCotacoes } from '../../shared/entity/configuracaoAnaliseCotacoes';

import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './usuario-configuracao.component.html',
    providers: [UsuarioService, PapelService, ConfiguracaoAnaliseCotacaoService, CotacaoService]
})

export class UsuarioConfiguracaoComponent implements OnInit {

    /*Variaveis*/
    papeis: Papel[];
    alertaUtil: AlertaUtil;
    usuario: Usuario;
    query: string;
    configuracaoAnaliseCotacoes: ConfiguracaoAnaliseCotacoes;

    /*Construtor*/
    constructor(private usuarioService: UsuarioService, //
        private papelService: PapelService, //
        private configuracaoAnaliseService: ConfiguracaoAnaliseCotacaoService, //
        private cotacaoService: CotacaoService) {
        this.alertaUtil = new AlertaUtil();
        this.usuario = JSON.parse(localStorage.getItem('usuario_investimento'));
        this.configuracaoAnaliseCotacoes = new ConfiguracaoAnaliseCotacoes();
    }

    /*Métodos*/
    public ngOnInit(): void {
        this.recuperarTodosPapeis();
        this.recuperarConfiguracaoAnalise();
    }
    public recuperarTodosPapeis(): void {
        this.papelService.recuperarTodosPapeis()
            .subscribe(
                data => {
                    this.papeis = data;
                    console.log('Sucesso recuperarTodosPapeis().');
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
    public alterarUsuario(event: any): void {
        event.preventDefault();

        this.usuarioService.alterarUsuario(this.usuario)
            .subscribe(
                result => {
                    let usuarioLocal = result.objeto;
                    usuarioLocal.password = '';
                    localStorage.setItem('usuario_investimento', JSON.stringify(usuarioLocal));
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
    public ativarDesativarPapel(papel: Papel): void {
            this.papelService.ativarDesativarPapel(papel)
                .subscribe(
                    result => {
                        // this.recuperarTodosPapeis();
                        papel.ativo = !papel.ativo;
                        this.alertaUtil.addMessage({
                            type: 'success',
                            closable: true,
                            msg: result.message
                        });
                        console.log('Sucesso ativarDesativarPapel().' + papel.papel);
                    },
                    error => {
                        this.alertaUtil.addMessage({
                            type: 'danger',
                            closable: true,
                            msg: error.message
                        });
                    }
                );
        }
        // FUNCIONALIDADES DA ABA CONFIGURAR META
    public alterarConfiguracaoAnalise(event: any): void {
        event.preventDefault();

        this.configuracaoAnaliseService.salvarConfiguracaoAnalise(this.configuracaoAnaliseCotacoes)
            .subscribe(
                result => {
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
    public recuperarConfiguracaoAnalise(): void {
            this.configuracaoAnaliseService.recuperarConfiguracaoAnalise()
                .subscribe(
                    result => {
                        this.configuracaoAnaliseCotacoes = result.objeto;
                        console.log('Sucesso recuperarConfiguracaoAnalise().');
                    },
                    error => {
                        this.alertaUtil.addMessage({
                            type: 'danger',
                            closable: true,
                            msg: error.message
                        });
                    }
                );
        }
        // FINAL FUNCIONALIDADES DA ABA CONFIGURAR META
        // FUNCIONALIDADE DA ABA Atualizar Cotação
    public atualizarHistoricoBMF(): void {
        this.cotacaoService.atualizarHistoricoBMF()
            .subscribe(
                result => {
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
    public atualizarAtualBMF(): void {
            this.cotacaoService.atualizarAtualBMF()
                .subscribe(
                    result => {
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
        // FINAL FUNCIONALIDADE DA ABA Atualizar Cotação

}
