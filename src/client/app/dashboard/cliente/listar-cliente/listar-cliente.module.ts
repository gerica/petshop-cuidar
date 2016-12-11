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

import { ListarClienteComponent } from './listar-cliente.component';

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
    declarations: [ListarClienteComponent],
    exports: [ListarClienteComponent]
})

export class ListarClienteModule { }
