export interface IPage {
	_id: string
	title: string
	data: string
	createdAt: Date
	updatedAt: Date
	link: string
}

export interface IFunnel {
	favIcon: string
	pages: IPage[]
	_id: string
	category: string
	title: string
	contactEmail: string
	createdAt: Date
	updatedAt: Date
	baseDomain: string
}
