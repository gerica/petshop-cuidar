import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { VenderProdutoComponent } from './index';

export const VenderProdutoRoutes: Route[] = [{
    path: 'vender-produto',
    component: VenderProdutoComponent,
    canActivate: [AuthGuard]
}, ];
