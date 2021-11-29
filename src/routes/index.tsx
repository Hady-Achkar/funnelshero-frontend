import React from 'react'
import {Switch} from 'react-router-dom'
import {HomePage, BuilderPage, SigninPage} from '../pages'
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
		path: '/builder',
		exact: true,
		isPrivate: false,
		component: BuilderPage,
	},
	{
		path: '/sign-in',
		exact: true,
		isPrivate: false,
		component: SigninPage,
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
