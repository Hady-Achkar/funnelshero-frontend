import {ToolbarItem, ToolbarSection} from '../../editor'
import React, {useCallback, useState, useEffect} from 'react'
import {getMyFiles} from '../../../services'
import getRandomImages from '../../../services/GetRandomImages'
import searchImages from '../../../services/SearchImages'
import {GetRandomImages} from '../../../services'
import {File} from '../../../services/GetFiles'
import {
	Grid,
	Container,
	Toolbar,
	LinearProgress,
	Box,
	ImageList,
	ImageListItem,
} from '@material-ui/core'
import Wrapper from '../../common/Wrapper'
import {useNode} from '@craftjs/core'
import {ImageSearch as ImageSearchIcon} from '@material-ui/icons'

export const ImageSettings = () => {
	const [images, setImages] = useState<GetRandomImages.Image[]>([])
	const [myImages, setMyImages] = useState<File[]>([])
	const [storage, setStorage] = useState<number>(0)

	const [loading, setLoading] = useState<boolean>(true)
	const [selfImagesLoading, setSelfImagesLoading] = useState<boolean>(true)

	const fetchImages = useCallback(() => {
		setLoading(true)
		getRandomImages()
			.then((res) => {
				setImages(res.data.images)
				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.error(err.response.data)
				} else {
					console.error(err)
				}
			})
	}, [])

	const fetchMyImages = useCallback(() => {
		setSelfImagesLoading(true)
		getMyFiles()
			.then((res) => {
				setMyImages(res.data.files)
				setStorage(res.data.totalSize)
				setSelfImagesLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.error(err.response.data)
				} else {
					console.error(err)
				}
			})
	}, [])

	const searchImagesHelper = useCallback((e) => {
		if (e.key === 'Enter') {
			const searchKey = e.target.value

			if (searchKey.length === 0) {
				return
			}
			setLoading(true)
			searchImages(searchKey)
				.then((res) => {
					setImages(res.data.images)
					setLoading(false)
				})
				.catch((err) => {
					if (err.response) {
						console.error(err.response.data.message)
					} else {
						console.error(err)
					}
				})
		}
	}, [])

	useEffect(() => {
		fetchImages()
		fetchMyImages()
		return () => {
			fetchImages()
			fetchMyImages()
		}
	}, [fetchImages, fetchMyImages])

	const {
		actions: {setProp},
	} = useNode()
	return (
		<React.Fragment>
			<ToolbarSection title="Image">
				<ToolbarItem full={true} propKey="src" type="text" label="Image URL" />

				<ToolbarItem
					full={true}
					propKey="src"
					type="file"
					label="Upload your image"
				/>
			</ToolbarSection>
			<ToolbarSection full={true} title="Unsplash">
				<Grid container className="mb-3">
					<div className="relative rounded-md shadow-sm w-full">
						<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
							<ImageSearchIcon />
						</div>
						<input
							type="text"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-sm ring-gray-500 rounded-md py-2"
							onKeyPress={searchImagesHelper}
						/>
					</div>
				</Grid>
				<Wrapper loading={loading}>
					<ImageList cols={3} rowHeight={100}>
						{images.map((image) => {
							return (
								<ImageListItem key={image.id}>
									<img
										src={image.urls.small}
										className="rounded cursor-pointer hover:border-indigo-500"
										alt={`Funnelshero - ${image.alt}`}
										onClick={() =>
											setProp((prop) => (prop.src = image.urls.regular))
										}
										style={{height: '100%'}}
									/>
								</ImageListItem>
							)
						})}
					</ImageList>
				</Wrapper>
			</ToolbarSection>
			<ToolbarSection full={true} title="Files">
				<Wrapper loading={selfImagesLoading}>
					<ImageList cols={3} rowHeight={100}>
						{myImages.map((image, index) => {
							return (
								<ImageListItem key={index}>
									<img
										src={image.Key}
										className="rounded cursor-pointer hover:border-indigo-500"
										alt={`Funnelshero - custom image`}
										onClick={() => setProp((prop) => (prop.src = image.Key))}
										style={{height: '100%'}}
									/>
								</ImageListItem>
							)
						})}
					</ImageList>
				</Wrapper>
			</ToolbarSection>
			{/* <Toolbar>
				<Box className="w-full">
					<label className="my-2">Storage used: {storage.toFixed(2)} MB</label>
					<LinearProgress variant="determinate" value={storage} />
				</Box>
			</Toolbar> */}
			<ToolbarSection
				title="Dimensions"
				props={['width', 'height']}
				summary={({width, height}: any) => {
					return `${width || 0} x ${height || 0}`
				}}
			>
				<ToolbarItem propKey="width" type="text" label="Width" />
				<ToolbarItem propKey="height" type="text" label="Height" />
			</ToolbarSection>
			<ToolbarSection
				title="Margin"
				props={['margin']}
				summary={({margin}: any) => {
					return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
						margin[3] || 0
					}px`
				}}
			>
				<ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
				<ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
				<ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
				<ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
			</ToolbarSection>
			<ToolbarSection
				title="Padding"
				props={['padding']}
				summary={({padding}: any) => {
					return `${padding[0] || 0}px ${padding[1] || 0}px ${
						padding[2] || 0
					}px ${padding[3] || 0}px`
				}}
			>
				<ToolbarItem propKey="padding" index={0} type="slider" label="Top" />
				<ToolbarItem propKey="padding" index={1} type="slider" label="Right" />
				<ToolbarItem propKey="padding" index={2} type="slider" label="Bottom" />
				<ToolbarItem propKey="padding" index={3} type="slider" label="Left" />
			</ToolbarSection>
			<ToolbarSection title="Decoration" props={['radius', 'shadow']}>
				<ToolbarItem
					full={true}
					propKey="radius"
					type="slider"
					label="Radius"
				/>
				<ToolbarItem
					full={true}
					propKey="shadow"
					type="slider"
					label="Shadow"
				/>
			</ToolbarSection>
		</React.Fragment>
	)
}
