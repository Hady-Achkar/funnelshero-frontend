import React from 'react'
import {Container} from '@material-ui/core'
import YouTube from 'react-youtube'
import styled from 'styled-components'

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

	return (
		<Container>
			<YouTube
				videoId={videoId}
				opts={{
					width: '100%',
					height: '500px',
				}}
			/>
		</Container>
	)
}

export default Video
