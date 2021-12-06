import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../reducers'
import {
	AuthAxios,
	ManagerAxios,
	IconAxios,
	FileAxios,
	ImagesAxios,
} from '../lib'

export interface IRoutProps {
	isPrivate: boolean
	path: string
	exact: boolean
	component: React.FC
}
const RouteWrapper: React.FC<IRoutProps> = (props) => {
	const {isPrivate} = props
	const state = useSelector((state: AppState) => state.auth)
	const {
		isAuthenticated,
		user: {token},
	} = state
	ManagerAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	ManagerAxios.defaults.headers.common['Accept'] = 'application/json'
	IconAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	IconAxios.defaults.headers.common['Accept'] = 'application/json'
	FileAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	FileAxios.defaults.headers.common['Accept'] = 'application/json'
	ImagesAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	ImagesAxios.defaults.headers.common['Accept'] = 'application/json'
	AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	AuthAxios.defaults.headers.common['Accept'] = 'application/json'

	if (!isAuthenticated) {
		if (isPrivate) {
			return <Redirect to="/sign-in" />
		} else {
			return <Route {...props} />
		}
	} else {
		if (
			props.path === '/sign-in' ||
			(props.path === '/sign-up' && isAuthenticated === true)
		) {
			return <Redirect to="/" />
		}
		return <Route {...props} />
	}
}

export default RouteWrapper
