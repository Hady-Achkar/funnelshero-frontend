import React from 'react'
import {useHistory} from 'react-router-dom'
import Routes from './routes'
import './index.css'
import 'tailwindcss/tailwind.css'
import {ManagerAxios, FileAxios, IconAxios, AuthAxios, ImagesAxios} from './lib'
import {useDispatch} from 'react-redux'
import {logoutAction, startInitializeBundles} from './actions'

const App: React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	dispatch(startInitializeBundles())
	ManagerAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				history.push('/500')
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		},
	)
	FileAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				history.push('/500')
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		},
	)

	IconAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				history.push('/500')
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		},
	)
	AuthAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				history.push('/500')
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		},
	)
	ImagesAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				history.push('/500')
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		},
	)

	return <Routes />
}

export default App
