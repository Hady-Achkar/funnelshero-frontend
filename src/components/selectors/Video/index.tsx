import {useNode, useEditor} from '@craftjs/core'
import {Container} from '@material-ui/core'

import React from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import {VideoSettings} from './VideoSettings'

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
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))
	const {
		connectors: {connect},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))

	const {videoId, type} = props

	const handleVideoLink = (videoLink: string) => {
		if (type === 'youtube') {
			const regExp =
				/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
			const match = videoLink.match(regExp)
			return match && match[7].length == 11 ? match[7] : false
		}
		if (type === 'vimeo') {
			const match = /vimeo.*\/(\d+)/i.exec(videoLink)
			if (match) {
				return match[1]
			}
		}
	}

	return (
		<YoutubeDiv ref={connect}>
			<iframe
				width="100%"
				height="375"
				className="p-4"
				src={
					type === 'youtube'
						? `https://www.youtube.com/embed/${handleVideoLink(videoId)}`
						: `https://player.vimeo.com/video/${handleVideoLink(videoId)}`
				}
			></iframe>
		</YoutubeDiv>
	)
}

Video.craft = {
	displayName: 'Video',
	props: {
		videoId: 'BHACKCNDMW8',
		type: 'youtube',
	},
	related: {
		toolbar: VideoSettings,
	},
}
export default Video
