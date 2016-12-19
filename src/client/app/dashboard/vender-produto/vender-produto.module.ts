import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { VenderProdutoComponent } from './vender-produto.component';

@NgModule({
    imports: [SharedModule],
    declarations: [VenderProdutoComponent],
    exports: [VenderProdutoComponent]
})

export class VenderProdutoModule { }
