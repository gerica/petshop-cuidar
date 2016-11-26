import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    // AlertModule,
    // ButtonsModule,
    // DropdownModule,
    // PaginationModule,
    // ProgressbarModule,
    // RatingModule,
    // TabsModule,
    // TooltipModule,
    ModalModule,
    // TypeaheadModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { InputMaskCurrentDirective } from '../shared/directive/input-mask-current.directive';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [CommonModule, RouterModule, ModalModule, FormsModule],
    declarations: [InputMaskCurrentDirective],
    exports: [CommonModule, FormsModule, RouterModule, InputMaskCurrentDirective]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
