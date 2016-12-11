import { FiltroPorCliente } from './../pipes/cliente.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination'; // <-- import the module

import {
    AlertModule,
    TabsModule,
    ModalModule,
    AccordionModule,
    TypeaheadModule,
    PaginationModule
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
        TypeaheadModule,
        Ng2PaginationModule,
        PaginationModule
    ],
    declarations: [ListarClienteComponent, FiltroPorCliente],
    exports: [ListarClienteComponent]
})

export class ListarClienteModule { }
