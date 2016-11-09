import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { CotacaoGraficoComponent } from './index';

export const CotacaoGraficoRoutes: Route[] = [{
    path: 'cotacao-grafico',
    component: CotacaoGraficoComponent,
    canActivate: [AuthGuard]
}, ];
