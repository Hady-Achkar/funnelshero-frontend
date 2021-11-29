import {Editor, Frame, Element} from '@craftjs/core'
import {ThemeProvider} from '@material-ui/styles'
import React from 'react'
import {createTheme} from '@material-ui/core/styles'
import {
	RenderNode,
	Container,
	Button,
	Divider,
	HyperLink,
	Video,
	Viewport,
	Text,
	Image,
} from '../../components'
const Post: React.FC = () => {
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
					<Viewport>
						<Frame>
							<Element
								canvas
								is={Container}
								width="800px"
								height="100%"
								background={{r: 255, g: 255, b: 255, a: 1}}
								padding={['40', '40', '40', '40']}
								custom={{displayName: 'App'}}
							/>
						</Frame>
					</Viewport>
				</Editor>
			</div>
		</ThemeProvider>
	)
}

export default Post
