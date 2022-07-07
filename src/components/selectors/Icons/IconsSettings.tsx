import React, {useState, useEffect, useCallback} from 'react'
import {useNode} from '@craftjs/core'
import searchIcons from '../../../services/SearchIcons'
import {getRandomIcons} from '../../../services'
import {Image} from '../../../services/GetIcons'
import {Grid} from '@material-ui/core'
import {ToolbarSection, ButtonsGroup, ToolbarItem} from '../../editor'
import Wrapper from '../../common/Wrapper'
import {Search} from '@material-ui/icons'

export enum IconSize {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	LARGE = 'LARGE',
}

const IconsSettings = () => {
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const [icons, setIcons] = useState<Image[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchIcons = useCallback(() => {
		setLoading(true)
		getRandomIcons()
			.then((res) => {
				setIcons(res.data.images)
				setLoading(false)
			})
			.catch((error) => {
				if (error.respones) {
					console.error(error.response.data.message)
				} else {
					console.error(error)
				}
			})
	}, [])

	useEffect(() => {
		fetchIcons()
		return () => fetchIcons()
	}, [fetchIcons])

	const searchIconsHelper = useCallback((e) => {
		if (e.key === 'Enter') {
			const searchKey = e.target.value

			if (searchKey.length === 0) {
				return
			}
			setLoading(true)
			searchIcons(searchKey)
				.then((res) => {
					setIcons(res.data.images)
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

	return (
		<React.Fragment>
			<ToolbarItem type="text" propKey="href" label="Link to" />
			<ButtonsGroup title="Icon size">
				<ButtonsGroup.Item title="S" id="SMALL" name="size" align="left" />
				<ButtonsGroup.Item title="M" id="MEDIUM" name="size" align="middle" />
				<ButtonsGroup.Item title="L" id="LARGE" name="size" align="right" />
			</ButtonsGroup>
			<ToolbarSection full={true} title="Icons">
				<Grid container className="mb-3">
					<div className="relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
							<Search />
						</div>
						<input
							type="text"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-sm ring-gray-500 rounded-md py-1"
							placeholder="search.."
							onKeyPress={searchIconsHelper}
						/>
					</div>
				</Grid>
				<Wrapper loading={loading}>
					<Grid container>
						{icons.map((icon) => {
							return (
								<Grid justifyContent="center" item xs={3} key={icon.id}>
									<img
										src={icon.url}
										className="rounded cursor-pointer hover:border-indigo-500"
										alt={`Funnelshero - ${icon.description}`}
										onClick={() => setProp((prop) => (prop.src = icon.url))}
									/>
								</Grid>
							)
						})}
					</Grid>
				</Wrapper>
			</ToolbarSection>
		</React.Fragment>
	)
}

export default IconsSettings
