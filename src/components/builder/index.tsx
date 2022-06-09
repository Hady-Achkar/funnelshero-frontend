import {Editor, Frame} from '@craftjs/core'
import {ThemeProvider} from '@material-ui/styles'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import {createTheme} from '@material-ui/core/styles'
import lz from 'lzutf8'
import saveFunnel from '../../services/EditPage'
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
	CodeBlockComponent,
} from '../'
import {useDispatch} from 'react-redux'
import {IFunnel, IPage} from '../../types'
import {Prompt} from 'react-router-dom'

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
		CodeBlockComponent,
	}

	const dispatch = useDispatch()
	const ref = useRef<string>()
	useEffect(() => {
		ref.current = mainPage?._id
	}, [mainPage])

	// const html = new htmlCreator(mainPage?.data)
	// console.log(html)

	const [blocking, setBlocking] = useState(false)

	function deepEqual(object1, object2) {
		const keys1 = Object.keys(object1)
		const keys2 = Object.keys(object2)
		if (keys1.length !== keys2.length) {
			return false
		}
		for (const key of keys1) {
			const val1 = object1[key]
			const val2 = object2[key]
			const areObjects = isObject(val1) && isObject(val2)
			if (
				(areObjects && !deepEqual(val1, val2)) ||
				(!areObjects && val1 !== val2)
			) {
				return false
			}
		}
		return true
	}
	function isObject(object) {
		return object != null && typeof object === 'object'
	}

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
