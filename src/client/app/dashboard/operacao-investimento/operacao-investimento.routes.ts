import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { OperacaoInvestimentoComponent } from './index';

export const OperacaoInvestimentoRoutes: Route[] = [
	{
		path: 'operacao-investimento',
		component: OperacaoInvestimentoComponent,
		canActivate: [AuthGuard]
	},
];
