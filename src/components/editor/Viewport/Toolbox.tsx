import {Element, useEditor} from '@craftjs/core'
import {Tooltip} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import ButtonSvg from '../../../public/icons/toolbox/button.svg'

import {
	Button,
	Container,
	Text,
	Video,
	HyperLink,
	Image,
	Divider,
	Icon,
	OptinForm,
	Paragraph,
	Quizz,
	HeaderComponent,
	FooterComponent,
	CodeBlockComponent,
} from '../../selectors'
import {
	BlurLinear,
	CropLandscape,
	CropOriginal,
	InsertEmoticon,
	Link,
	PowerInput,
	TextFormat,
	VideoLibrary,
	CompareArrows,
} from '@material-ui/icons'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import ToolboxItem from './ToolboxItem'
import {TerminalIcon} from '@heroicons/react/solid'

const ToolboxDiv = styled.div<{enabled: boolean}>`
	transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
	background-color: white;

	${(props) => (!props.enabled ? `width: 0;` : '500px')}
	${(props) => (!props.enabled ? `opacity: 0;` : '')}
`

const Item = styled.a<{move?: boolean}>`
	svg {
		width: 22px;
		height: 22px;
		fill: #707070;
	}
	${(props) =>
		props.move &&
		`
    cursor: move;
  `}
`

export const Toolbox = () => {
	const {
		enabled,
		active,
		connectors: {create},
	} = useEditor((state) => ({
		enabled: state.options.enabled,
		active: state.events.selected,
	}))

	return (
		<ToolboxDiv
			enabled={enabled && enabled}
			className="toolbox transition overscroll-none h-full flex flex-col bg-white"
		>
			<div className="flex-1 flex flex-col min-h-0 overflow-y-scroll bg-indigo-600">
				<ToolboxItem
					title="Container"
					Icon={CropLandscape}
					component={Container}
					isCanva={true}
				/>
				<ToolboxItem
					isCanva={false}
					title="Image"
					Icon={CropOriginal}
					component={Image}
				/>
				<ToolboxItem
					isCanva={false}
					title="Title"
					Icon={TextFormat}
					component={Text}
				/>
				<ToolboxItem
					isCanva={false}
					title="Button"
					Icon={SmartButtonIcon}
					component={Button}
				/>
				<ToolboxItem
					isCanva={false}
					title="Video"
					Icon={VideoLibrary}
					component={Video}
				/>
				<ToolboxItem
					isCanva={false}
					title="Divider"
					Icon={PowerInput}
					component={Divider}
				/>
				<ToolboxItem
					isCanva={false}
					title="Paragraph"
					Icon={TextFormat}
					component={Paragraph}
				/>

				<ToolboxItem
					isCanva={true}
					title="Quiz"
					Icon={TextFormat}
					component={Quizz}
				/>

				<ToolboxItem
					isCanva={false}
					title="Form"
					Icon={BlurLinear}
					component={OptinForm}
				/>
				<ToolboxItem
					isCanva={false}
					title="Code Block"
					Icon={TerminalIcon}
					component={CodeBlockComponent}
				/>
				{/* <ToolboxItem
					isCanva={false}
					title="Header"
					Icon={BlurLinear}
					component={HeaderComponent}
				/>
				<ToolboxItem
					isCanva={false}
					title="footer"
					Icon={BlurLinear}
					component={FooterComponent}
				/> */}
			</div>
		</ToolboxDiv>
	)
}
