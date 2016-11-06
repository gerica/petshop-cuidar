import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { RelatorioSaida } from './relatorio-saida';
import { Ano } from './ano';
import { Mes } from './mes';
import { Papel } from '../../shared/entity/papel';
import { OperacaoSaida } from '../../shared/entity/operacao-saida';
import { PapelService } from '../../shared/service/papel.service';
import { OperacaoService } from '../../shared/service/operacao.service';

const ANOS: Ano[] = [
    { num: 2015 },
    { num: 2016 },
];

const MESES: Mes[] = [
    { id: 1, descricao: 'Janeiro' },
    { id: 2, descricao: 'Fevereiro' },
    { id: 3, descricao: 'Março' },
    { id: 4, descricao: 'Abril' },
    { id: 5, descricao: 'Maio' },
    { id: 6, descricao: 'Junho' },
    { id: 7, descricao: 'Julho' },
    { id: 8, descricao: 'Agosto' },
    { id: 9, descricao: 'Setembro' },
    { id: 10, descricao: 'Outubro' },
    { id: 11, descricao: 'Novembro' },
    { id: 12, descricao: 'Dezembro' },
    { id: 0, descricao: 'Todos' },
];

@Component( {
    moduleId: module.id,
    selector: 'relatorio-saida-component',
    templateUrl: './relatorio-saida.component.html',
    providers: [PapelService, OperacaoService]

})

export class RelatorioSaidaComponent implements OnInit {

    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    relatorioSaida: RelatorioSaida;
    anos = ANOS;
    meses = MESES;
    papeis: Papel[];
    papelDefault: Papel;
    operacoesSaida: OperacaoSaida[];

    /*Construtor*/
    constructor( private papelService: PapelService, private operacaoService: OperacaoService ) { }

    /*Métodos*/
    public ngOnInit(): void {
        this.recuperarPapeisOperacao();
        this.criarValoresDefault();
    }
    public recuperarPapeisOperacao(): void {
        this.papelService.recuperarPapeisOperacao()
            .subscribe(
            data => {
                this.papeis = data.objeto;

                this.papeis[this.papeis.length] = this.papelDefault;
            },
            error => {
                this.alertaUtil.addMessage( {
                    type: 'danger',
                    closable: true,
                    msg: error
                });
            });
    }
    public pesquisarRelatorioSaida( event: any ): void {
        event.preventDefault();
        this.operacaoService.recuperarRelatorioSaida( this.relatorioSaida.ano.num, this.relatorioSaida.mes.id, this.relatorioSaida.papel.id )
            .subscribe(
            data => {
                this.operacoesSaida = data.objeto;
                if ( this.operacoesSaida.length === 0 ) {
                    this.alertaUtil.addMessage( {
                        type: 'warning',
                        closable: true,
                        msg: "Nenhum resultado para os parâmetros informado."
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
    private criarValoresDefault(): void {
        this.relatorioSaida = new RelatorioSaida();

        this.papelDefault = new Papel();
        this.papelDefault.papel = 'Todos';
        this.papelDefault.id = 0;

        let hoje = new Date();
        let anoCorrente = hoje.getFullYear();
        let mesCorrente = hoje.getMonth() + 1;

        this.relatorioSaida.papel = this.papelDefault;
        this.relatorioSaida.ano = this.recuperarAno( anoCorrente );
        this.relatorioSaida.mes = this.recuperarMes( mesCorrente );

        console.log( this.relatorioSaida );
    }
    private recuperarAno( num: number ): Ano {
        for ( var i = 0; i < this.anos.length; i++ ) {
            if ( this.anos[i].num === num ) {
                return this.anos[i];
            }
        }
        return null;

    }
    private recuperarMes( id: number ): Mes {
        for ( var i = 0; i < this.meses.length; i++ ) {
            if ( this.meses[i].id === id ) {
                return this.meses[i];
            }
        }
        return null;
    }

}
