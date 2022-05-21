import {Editor, Frame, Element} from '@craftjs/core'
import {ThemeProvider} from '@material-ui/styles'
import React, {Fragment, useEffect, useRef} from 'react'
import {createTheme} from '@material-ui/core/styles'

import {
	Button,
	Container,
	Divider,
	HyperLink,
	Image,
	Paragraph,
	RenderNode,
	Text,
	Video,
	Viewport,
	Quizz,
	QuizzElement,
	QuizContainer,
	OptinForm,
	HeaderComponent,
	FooterComponent,
	Icon,
	IconsContainer,
	TextContainer,
	InputComponent,
} from '../'
import {useDispatch} from 'react-redux'
import {IFunnel, IPage} from '../../types'
import htmlCreator from 'html-creator'

interface IProps {
	data: IFunnel
	mainPage: IPage
	handleChangePage: (page: IPage) => void
}

const Builder: React.FC<IProps> = (props) => {
	const {data, mainPage, handleChangePage} = props
	const theme = createTheme({
		typography: {
			fontFamily: [
				'acumin-pro',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
			].join(','),
		},
	})
	const contentElements = {
		Container,
		Text,
		Image,
		Button,
		Video,
		HyperLink,
		Divider,
		Paragraph,
		Quizz,
		QuizzElement,
		QuizContainer,
		OptinForm,
		Fragment,
		HeaderComponent,
		FooterComponent,
		Icon,
		IconsContainer,
		TextContainer,
		InputComponent,
	}

	const dispatch = useDispatch()
	const ref = useRef<string>()
	useEffect(() => {
		ref.current = mainPage?._id
	}, [mainPage])

	// const html = new htmlCreator(mainPage?.data)
	// console.log(html)

	return (
		<ThemeProvider theme={theme}>
			<div className="h-full">
				<Editor
					resolver={contentElements}
					enabled={true}
					onRender={RenderNode}
					indicator={{success: '#2d9d78', error: '#e34850'}}
				>
					<Viewport
						data={data}
						handleChangePage={handleChangePage}
						mainPage={mainPage}
					>
						<Frame data={mainPage?.data} />
					</Viewport>
				</Editor>
			</div>
		</ThemeProvider>
	)
}

export default React.memo(Builder)
