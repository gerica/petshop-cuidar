import { Route } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutes: Route[] = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'home/:desc',
		component: HomeComponent
	}
];
