import { EnderecoClienteComponent } from './endereco-cliente.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

import {
    AlertModule,
    TabsModule,
    ModalModule,
    AccordionModule,
    TypeaheadModule,
} from 'ng2-bootstrap/ng2-bootstrap';

import { CadastrarClienteComponent } from './cadastrar-cliente.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule,
        AccordionModule,
        TypeaheadModule,
        TextMaskModule
    ],
    declarations: [CadastrarClienteComponent, EnderecoClienteComponent],
    exports: [CadastrarClienteComponent]
})

export class CadastrarClienteModule { }
