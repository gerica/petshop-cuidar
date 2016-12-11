import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    AlertModule,
    TabsModule,
    ModalModule,
    AccordionModule,
    TypeaheadModule
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
        TypeaheadModule
    ],
    declarations: [CadastrarClienteComponent],
    exports: [CadastrarClienteComponent]
})

export class CadastrarClienteModule { }
