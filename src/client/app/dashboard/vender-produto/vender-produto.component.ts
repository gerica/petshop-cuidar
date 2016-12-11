import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from './../../shared/service/utils.service';
import { Pessoa } from './../../shared/entity/pessoa/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [UtilsService],
    styles: [`
    	.tooltip.customClass .tooltip-inner {
    		color: #880000;
    		background-color: #ffff66;
    		box-shadow: 0 6px 12px rgba(0,0,0,.175);
    	}
    	.tooltip.customClass .tooltip-arrow {
    		display: none;
    	}
    `]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;


    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService) {
        this.dataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.asyncSelected);
        }).mergeMap((token: string) => this.getStatesAsObservable(token));

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarEstados();

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        // this.usuarioService.incluirUsuario(this.usuario, this.rolesSelected)
        //     .subscribe(
        //     result => {
        //         this.recuperarUsuariosAtivo();
        //         this.alertaUtil.addMessage({
        //             type: 'success',
        //             closable: true,
        //             msg: result.message
        //         });
        //         this.novo();
        //     },
        //     err => {
        //         // Log errors if any
        //         this.alertaUtil.addMessage({
        //             type: 'danger',
        //             closable: true,
        //             msg: err.message === undefined ? err : err.message
        //         });ReactiveFormsModule
        //     });
    }

    public recuperarEstados(): void {
        // this.utilsService.recuperarEstados()
        //     .subscribe(
        //     data => {
        //         this.estados = data.objeto;
        //     },
        //     error => {
        //         this.alertaUtil.addMessage({
        //             type: 'danger',
        //             closable: true,
        //             msg: error.message === undefined ? error : error.message
        //         });
        //     }
        //     );

    }

    public stateCtrl: FormControl = new FormControl();

    public vendaForm: FormGroup = new FormGroup({
        state: this.stateCtrl
    })

    public asyncSelected: string = '';
    public dataSource: Observable<any>;

    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;

    public statesComplex: Array<any> = [
        { id: 1, name: 'Alabama', region: 'South' }, { id: 2, name: 'Alaska', region: 'West' }, { id: 3, name: 'Arizona', region: 'West' },
        { id: 4, name: 'Arkansas', region: 'South' }, { id: 5, name: 'California', region: 'West' },
        { id: 6, name: 'Colorado', region: 'West' }, { id: 7, name: 'Connecticut', region: 'Northeast' },
        { id: 8, name: 'Delaware', region: 'South' }, { id: 9, name: 'Florida', region: 'South' },
        { id: 10, name: 'Georgia', region: 'South' }, { id: 11, name: 'Hawaii', region: 'West' },
        { id: 12, name: 'Idaho', region: 'West' }, { id: 13, name: 'Illinois', region: 'Midwest' },
        { id: 14, name: 'Indiana', region: 'Midwest' }, { id: 15, name: 'Iowa', region: 'Midwest' },
        { id: 16, name: 'Kansas', region: 'Midwest' }, { id: 17, name: 'Kentucky', region: 'South' },
        { id: 18, name: 'Louisiana', region: 'South' }, { id: 19, name: 'Maine', region: 'Northeast' },
        { id: 21, name: 'Maryland', region: 'South' }, { id: 22, name: 'Massachusetts', region: 'Northeast' },
        { id: 23, name: 'Michigan', region: 'Midwest' }, { id: 24, name: 'Minnesota', region: 'Midwest' },
        { id: 25, name: 'Mississippi', region: 'South' }, { id: 26, name: 'Missouri', region: 'Midwest' },
        { id: 27, name: 'Montana', region: 'West' }, { id: 28, name: 'Nebraska', region: 'Midwest' },
        { id: 29, name: 'Nevada', region: 'West' }, { id: 30, name: 'New Hampshire', region: 'Northeast' },
        { id: 31, name: 'New Jersey', region: 'Northeast' }, { id: 32, name: 'New Mexico', region: 'West' },
        { id: 33, name: 'New York', region: 'Northeast' }, { id: 34, name: 'North Dakota', region: 'Midwest' },
        { id: 35, name: 'North Carolina', region: 'South' }, { id: 36, name: 'Ohio', region: 'Midwest' },
        { id: 37, name: 'Oklahoma', region: 'South' }, { id: 38, name: 'Oregon', region: 'West' },
        { id: 39, name: 'Pennsylvania', region: 'Northeast' }, { id: 40, name: 'Rhode Island', region: 'Northeast' },
        { id: 41, name: 'South Carolina', region: 'South' }, { id: 42, name: 'South Dakota', region: 'Midwest' },
        { id: 43, name: 'Tennessee', region: 'South' }, { id: 44, name: 'Texas', region: 'South' },
        { id: 45, name: 'Utah', region: 'West' }, { id: 46, name: 'Vermont', region: 'Northeast' },
        { id: 47, name: 'Virginia', region: 'South' }, { id: 48, name: 'Washington', region: 'South' },
        { id: 49, name: 'West Virginia', region: 'South' }, { id: 50, name: 'Wisconsin', region: 'Midwest' },
        { id: 51, name: 'Wyoming', region: 'West' }];
    public states: Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico',
        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'];

    public getStatesAsObservable(token: string): Observable<any> {
        let query = new RegExp(token, 'ig');

        return Observable.of(
            this.statesComplex.filter((state: any) => {
                return query.test(state.name);
            })
        );
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: any): void {
        console.log('Selected value: ', e.value);
    }

}
