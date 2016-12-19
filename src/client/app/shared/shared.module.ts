import { UtilsService } from './service/utils.service';
import { TypeAheadClienteComponent } from './component/typeahead-cliente.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { InputMaskCurrentDirective } from '../shared/directive/input-mask-current.directive';

@NgModule({
    imports: [CommonModule,
        RouterModule,
        FormsModule,
        AlertModule,
        ButtonsModule,
        DropdownModule,
        PaginationModule,
        ProgressbarModule,
        RatingModule,
        TabsModule,
        TooltipModule,
        ModalModule,
        TypeaheadModule],
    declarations: [InputMaskCurrentDirective, TypeAheadClienteComponent],
    exports: [CommonModule,
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
        FormsModule,
        RouterModule,
        InputMaskCurrentDirective,
        ReactiveFormsModule,
        TypeAheadClienteComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [UtilsService]
        };
    }
}
