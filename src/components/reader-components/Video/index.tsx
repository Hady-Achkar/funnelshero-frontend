import React from 'react'
import {Container} from '@material-ui/core'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import {ComponentLayout} from '../..'

const YoutubeDiv = styled.div<any>`
	width: 100%;
	height: 100%;
	> div {
		height: 100%;
	}
	iframe {
		pointer-events: ${(props) => (props.enabled ? 'none' : 'auto')};
		// width:100%!important;
		// height:100%!important;
	}
`

const Video = (props: any) => {
	const {videoId} = props

	console.log(props)

	return (
		<ComponentLayout>
			<iframe
				style={{maxWidth: '672px'}}
				width="672"
				height="375"
				className="mx-auto"
				src={`https://www.youtube.com/embed/${videoId}`}
			></iframe>
		</ComponentLayout>
	)
}

export default Video
