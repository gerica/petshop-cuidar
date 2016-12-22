import { ActivatedRoute } from '@angular/router';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';


@Component({
    moduleId: module.id,
    selector: 'cadastrar-produto',
    templateUrl: './cadastrar-produto.component.html',
    providers: [PessoaService]
})

export class CadastrarProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;

    /**
     * Construtor
     */
    constructor(private route: ActivatedRoute) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        console.warn('Apagar esse componente se não for utilizar');
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
    }


    /**
     * Grava novo cliente
     */
    public gravar(event: any): void {
        event.preventDefault();

    }


}
