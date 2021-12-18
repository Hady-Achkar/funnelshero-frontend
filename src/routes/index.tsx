import React from 'react'
import {Switch} from 'react-router-dom'
import {
	HomePage,
	SigninPage,
	DashboardPage,
	FunnelPage,
	AccountSettings,
	CheckoutPage,
	BundlesPage,
	SignupPage,
} from '../pages'
import Route from './route'

export interface IRoutesConfiguration {
	isPrivate: boolean
	path: string
	exact: boolean
	component: React.FC
}

//TO-Do incase we need subroutes---> https://reactrouter.com/web/example/route-config
const routesConfiguration: IRoutesConfiguration[] = [
	{
		path: '/',
		exact: true,
		isPrivate: false,
		component: HomePage,
	},
	{
		path: '/sign-in',
		exact: true,
		isPrivate: false,
		component: SigninPage,
	},
	{
		path: '/dashboard',
		exact: true,
		isPrivate: true,
		component: DashboardPage,
	},
	{
		path: '/funnels/:funnelTitle',
		exact: true,
		isPrivate: true,
		component: FunnelPage,
	},
	{
		path: '/account-settings',
		exact: true,
		isPrivate: true,
		component: AccountSettings,
	},
	{
		path: '/checkout',
		exact: true,
		isPrivate: true,
		component: CheckoutPage,
	},
	{
		path: '/bundles',
		exact: true,
		isPrivate: false,
		component: BundlesPage,
	},
	{
		path: '/sign-up/:planId',
		exact: true,
		isPrivate: false,
		component: SignupPage,
	},
]

// incase we needed seperate store use context check this link https://react-redux.js.org/api/hooks#custom-context
const Routes: React.FC = () => {
	return (
		<Switch>
			{routesConfiguration.map((route, index) => (
				<Route {...route} key={index} />
			))}
		</Switch>
	)
}

export default Routes
