import { existsSync } from 'fs';
import { PessoaService } from './../../shared/service/pessoa/pessoa.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Pessoa } from './../../shared/entity/pessoa/pessoa';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'tyahead-cliente',
    templateUrl: './typeahead-cliente.component.html',
    providers: [PessoaService]
})

export class TypeAheadClienteComponent {
    @Output() notifyCliente: EventEmitter<any> = new EventEmitter<any>();
    clientes: Pessoa[];
    clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup = new FormGroup({
        clienteControl: this.clienteControl
    })
    asyncSelected: string = '';
    dataSource: Observable<any>;
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService) {
        this.dataSource = Observable.create((observer: any) => {
            this.pessoaService.recuperarPessoaPorNome(this.asyncSelected)
                .subscribe(
                data => {
                    this.clientes = data.objeto;
                    observer.next();
                },
                error => {
                    console.log(error.message === undefined ? error : error.message);
                }
                );
        }).mergeMap(() => this.getStatesAsObservable());

    }

    public getStatesAsObservable(): Observable<any> {
        return Observable.of(this.clientes);
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * onSelectedCliene()
     */
    public notifyClienteEmit(e : any) {
        this.notifyCliente.emit(e.item);
    }

}
