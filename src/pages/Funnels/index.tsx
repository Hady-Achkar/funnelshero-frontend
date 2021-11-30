import React, {useCallback, useEffect, useState} from 'react'
import {GetSingleFunnel, getSingleFunnel} from '../../services'
import {Builder, Wrapper} from '../../components'
import {useParams} from 'react-router-dom'
type Params = {
	funnelTitle: string
}
const Funnel = () => {
	const {funnelTitle} = useParams<Params>()
	const [funnel, setFunnel] = useState<GetSingleFunnel.Funnel>()
	const [mainPage, setMainPage] = useState<GetSingleFunnel.Page>()
	const [loading, setLoading] = useState<boolean>(false)

	const fetchFunnel = useCallback(() => {
		setLoading(true)
		getSingleFunnel(funnelTitle)
			.then((res) => {
				const {funnel} = res.data
				setFunnel(funnel)
				setMainPage(funnel.pages[0])
				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}, [])

	useEffect(() => {
		fetchFunnel()
		return () => fetchFunnel()
	}, [funnelTitle])
	const handleChangePage = useCallback((page: GetSingleFunnel.Page) => {
		setMainPage(page)
	}, [])

	return (
		<div>
			<Wrapper loading={loading}>
				<Builder
					data={funnel}
					mainPage={mainPage}
					handleChangePage={handleChangePage}
				/>
			</Wrapper>
		</div>
	)
}

export default Funnel
