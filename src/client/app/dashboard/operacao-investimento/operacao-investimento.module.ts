import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { OperacaoFechadaTabComponent } from './operacao-fechada-tab.component';
import { OperacaoAbertaTabComponent } from './operacao-aberta-tab.component';
import { SharedModule } from '../../shared/shared.module';
// import { OperacaoSaidaModalComponent } from '../../shared/components/operacao-saida-modal.component';
import { InputMaskCurrentDirective } from '../../shared/directive/input-mask-current.directive';

@NgModule({
    imports: [
        BrowserModule,
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
        TypeaheadModule,
        SharedModule
    ],
    declarations: [OperacaoInvestimentoComponent, OperacaoFechadaTabComponent, OperacaoAbertaTabComponent, InputMaskCurrentDirective],
    exports: [OperacaoInvestimentoComponent]
})

export class OperacaoInvestimentoModule {}

