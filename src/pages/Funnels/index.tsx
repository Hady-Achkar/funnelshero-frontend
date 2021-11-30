import React, {useCallback, useEffect, useState} from 'react'
import {GetMyFunnels, GetSingleFunnel, getSingleFunnel} from '../../services'
import {Builder, Wrapper} from '../../components'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
type Params = {
	funnelTitle: string
}
const Funnel = () => {
	const {funnelTitle} = useParams<Params>()
	const [funnel, setFunnel] = useState<GetMyFunnels.Funnel>()
	const [mainPage, setMainPage] = useState<GetSingleFunnel.Page>()
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const fetchFunnel = useCallback(() => {
		const stateFunnel = funnels.find((f) => f.title === funnelTitle)
		setFunnel(stateFunnel)
		setMainPage(stateFunnel.pages[0])
	}, [funnels])

	useEffect(() => {
		fetchFunnel()
		return () => fetchFunnel()
	}, [funnelTitle, funnels])
	const handleChangePage = useCallback((page: GetSingleFunnel.Page) => {
		setMainPage(page)
	}, [])
	const loading = !Boolean(funnel)

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
