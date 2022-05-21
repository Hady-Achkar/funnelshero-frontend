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

	console.log(props)

	return (
		<div>
			<iframe
				width="966"
				height="571"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
		</div>
	)
}

export default Video
