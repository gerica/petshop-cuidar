import {Component, OnInit} from '@angular/core';

import {UsuarioConfiguracaoService} from './usuario-configuracao.service';
import {Papel} from '../../shared/entity/papel';

import {AlertaUtil} from '../../shared/utils/alerta-util';
import { Usuario} from '../../shared/entity/usuario';

@Component({
	moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './usuario-configuracao.component.html',
    providers: [UsuarioConfiguracaoService]
})

export class UsuarioConfiguracaoComponent implements OnInit {

	/*Variaveis*/
    papeis: Papel[];
	alertaUtil: AlertaUtil;
	usuario: Usuario;

	/*Construtor*/
	constructor (private operacaoService: UsuarioConfiguracaoService) {
		this.alertaUtil = new AlertaUtil();
		this.usuario = JSON.parse(localStorage.getItem('usuario_investimento'));
		console.log(this.usuario);
	}

	/*Métodos*/
	ngOnInit(): void {
        // this.getAllPapel();
        // this.getAllOperacaoEntrada();
    }

/*	getAllPapel(): void {
        this.operacaoService.getAllPapel()
                .subscribe( 
                    data => {
                    		this.papeis = data;
                            console.log('Sucesso getAllPapel().')
                    }
                    ,
                    error => {
                        this.alertaUtil.addMessage(
                        		{
							     	type: 'danger',
							     	closable: true,
							     	msg: error
								}
                        	)
                        ;
                    } 
                );
    }  */

	alterarUsuario(event: any): void {
		event.preventDefault();

	    this.operacaoService.alterarUsuario(this.usuario)
	               .subscribe(
	                   result => {
	                       	let usuarioLocal = result.objeto;
                            usuarioLocal.password = '';
                            localStorage.setItem('usuario_investimento', JSON.stringify(usuarioLocal));
	                        this.alertaUtil.addMessage(
                        		{
							     	type: 'success',
							     	closable: true,
							     	msg: result.message
								}
                        	);
	                   },
	                    err => {
	                        // Log errors if any                                    
	                        this.alertaUtil.addMessage(
                        		{
							     	type: 'danger',
							     	closable: true,
							     	msg: err.message
								}
                        	);
	                });
	}


/*	gravarOperacaoSaida(event): void{
		event.preventDefault(); 
		
	    this.operacaoService.salvar(this.operacaoModal)
	               .subscribe(
	                   result => { 	                   		
	                       this.getAllOperacaoEntrada();
	                       this.alertaUtil.addMessage(
                        		{
							     	type: 'success',
							     	closable: true,
							     	msg: result.message
								}
                        	);
	                   },
	                    err => {
	                        // Log errors if any                                    
	                        this.alertaUtil.addMessage(
                        		{
							     	type: 'danger',
							     	closable: true,
							     	msg: err.message
								}
                        	);
	                });
	}

	getAllOperacaoEntrada(): void {
        this.operacaoService.getAllOperacaoEntrada()
                .subscribe( 
                    data => {                    		
                            console.log('Sucesso getAllOperacaoEntrada().');
                    }
                    ,
                    error => {
                        this.alertaUtil.addMessage(
                        		{
							     	type: 'danger',
							     	closable: true,
							     	msg: error
								}
                        	);
                    } 
                );
    }     
*/
}
