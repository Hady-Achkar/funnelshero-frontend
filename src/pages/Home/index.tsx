import React from 'react'
import {
	MainFooter,
	MainHeader,
	CEO,
	CTA,
	FAQ,
	Feature,
	Hero,
} from '../../components'

const Home = () => {
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
