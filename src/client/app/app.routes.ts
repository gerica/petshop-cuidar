import { PrimeiroLoginRoutes } from './primeiro-login/primeiro-login.routes';
import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { SignupRoutes } from './signup/index';
import { DashboardRoutes } from './dashboard/index';

import { LoginComponent } from './login/index';

export const routes: Routes = [
	...LoginRoutes,
	...SignupRoutes,
	...DashboardRoutes,
	...PrimeiroLoginRoutes,
	{ path: '**', component: LoginComponent }
];
