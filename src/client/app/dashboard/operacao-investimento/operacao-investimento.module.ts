import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
		AlertModule,
		ButtonsModule,
		DropdownModule,
		PaginationModule,
		ProgressbarModule,
		RatingModule,
		TabsModule,
		TooltipModule,
		ModalModule,
		TypeaheadModule
	} from 'ng2-bootstrap/ng2-bootstrap';

import { OperacaoInvestimentoComponent } from './operacao-investimento.component';

@NgModule({
    imports: [
    	BrowserModule,
    	FormsModule,
        RouterModule,
        AlertModule,
		ButtonsModule,
		DropdownModule,
		PaginationModule,
		ProgressbarModule,
		RatingModule,
		TabsModule,
		TooltipModule,
		ModalModule,
		TypeaheadModule
    ],
    declarations: [OperacaoInvestimentoComponent],
    exports: [OperacaoInvestimentoComponent]
})

export class OperacaoInvestimentoModule { }
