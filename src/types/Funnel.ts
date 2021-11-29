export interface IPage {
	_id: string
	title: string
	data: string
	createdAt: Date
	updatedAt: Date
}

export interface IFunnel {
	favIcon: string
	pages: IPage[]
	_id: string
	mainDomain: string
	category: string
	title: string
	contactEmail: string
	createdAt: Date
	updatedAt: Date
	subDomain: string
}
