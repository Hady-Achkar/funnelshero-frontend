import React, {useCallback, useEffect, useRef, useState} from 'react'
import {GetMyFunnels, GetSingleFunnel, getSingleFunnel} from '../../services'
import {Builder, Wrapper} from '../../components'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {IFunnel, IPage} from '../../types'
import {useEditor} from '@craftjs/core'
type Params = {
	funnelTitle: string
}
const Funnel = () => {
	const {funnelTitle} = useParams<Params>()
	const [funnel, setFunnel] = useState<IFunnel>()
	const [mainPage, setMainPage] = useState<IPage>()
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const ref = useRef<string>()
	const [prevPage, setPrevPage] = useState<number>(0)
	const fetchFunnel = () => {
		const stateFunnel = funnels.find((f) => f.title === funnelTitle)
		ref.current = stateFunnel.pages[prevPage]?._id
		setFunnel(stateFunnel)
		setMainPage(stateFunnel.pages[prevPage])
	}

	useEffect(() => {
		fetchFunnel()
		return () => fetchFunnel()
	}, [funnelTitle, funnels])
	const handleChangePage = (page) => {
		window.confirm('Are you sure you want to change the page?')
		ref.current = page?._id
		const index = funnel?.pages.indexOf(page)
		setPrevPage(index)
		setMainPage(page)
	}
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
