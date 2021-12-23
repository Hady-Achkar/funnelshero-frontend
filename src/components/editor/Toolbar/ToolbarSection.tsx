import {useNode} from '@craftjs/core'
import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Grid,
	Divider,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
const usePanelStyles = makeStyles((_) => ({
	root: {
		background: 'transparent',
		boxShadow: 'none',
		'&:before': {
			backgroundColor: 'rgba(0, 0, 0, 0.05)',
		},
		'&.Mui-expanded': {
			margin: '0 0',
			minHeight: '40px',
			'&:before': {
				opacity: '1',
			},
			'& + .MuiExpansionPanel-root:before ': {
				display: 'block',
			},
		},
	},
}))

const useSummaryStyles = makeStyles((_) => ({
	root: {
		'min-height': '40px',
		padding: 0,
		width: '100%',
	},
	content: {
		margin: '0px',
	},
}))

const ToolbarSection = ({title, props, summary, children}: any) => {
	const panelClasses = usePanelStyles({})
	const summaryClasses = useSummaryStyles({})
	const {nodeProps} = useNode((node) => ({
		nodeProps:
			props &&
			props.reduce((res: any, key: any) => {
				res[key] = node.data.props[key] || null
				return res
			}, {}),
	}))
	return (
		<ExpansionPanel className="" classes={panelClasses}>
			<ExpansionPanelSummary className=" text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg  ">
				<div className="px-6 w-full bg-indigo-50 py-3 rounded">
					<Grid container direction="row" alignItems="center" spacing={3}>
						<Grid item xs={4}>
							<p className=" text-left text-sm text-indigo-700">{title}</p>
						</Grid>
						{summary && props ? (
							<Grid item xs={8}>
								<h5 className="text-indigo-900 text-sm text-right text-dark-blue">
									{summary(
										props.reduce((acc: any, key: any) => {
											acc[key] = nodeProps[key]
											return acc
										}, {})
									)}
								</h5>
							</Grid>
						) : null}
					</Grid>
				</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails style={{padding: '0px 24px 20px'}}>
				<Grid container spacing={1}>
					{children}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}
export default ToolbarSection
