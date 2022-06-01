import {Search} from '@mui/icons-material'
import React, {useCallback, useEffect, useState} from 'react'
import {useNode} from '@craftjs/core'
import searchIcons from '../../../../services/SearchIcons'
import {getRandomIcons} from '../../../../services'
import {Image} from '../../../../services/GetIcons'
import {Grid} from '@material-ui/core'
import {ToolbarSection, ButtonsGroup, ToolbarItem} from '../../../editor'
import Wrapper from '../../../common/Wrapper'

const InputSettings = () => {
	const [icons, setIcons] = useState<Image[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const {
		actions: {setProp},
	} = useNode()

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
		<div>
			<ToolbarSection title="settings">
				<ToolbarItem type="text" propKey="placeholder" label="placeholder" />
				<ToolbarItem type="text" propKey="label" label="Form label" />
			</ToolbarSection>
			<ToolbarSection full={true} title="Icons">
				<ToolbarItem type="text" propKey="href" label="Link to" />
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
										onClick={() => setProp((prop) => (prop.iconSrc = icon.url))}
									/>
								</Grid>
							)
						})}
					</Grid>
				</Wrapper>
			</ToolbarSection>
		</div>
	)
}

export default InputSettings
