import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {
	MainFooter,
	MainHeader,
	CEO,
	CTA,
	FAQ,
	Feature,
	Hero,
} from '../../components'
import {UserState} from '../../models/IUser'
import {AppState} from '../../reducers'
import {useHistory} from 'react-router-dom'

const Home = () => {
	const {
		isAuthenticated,
		user: {status},
	} = useSelector((state: AppState) => state.auth)

	const history = useHistory()

	useEffect(() => {
		if (isAuthenticated && status !== UserState.SUB_ACTIVE) {
			history.push('/bundles')
		}
	}, [isAuthenticated, status])
	return (
		<div>
			<MainHeader />
			<Hero />
			<Feature />
			<FAQ />
			<CEO />
			<CTA />
			<MainFooter />
		</div>
	)
}

export default Home
