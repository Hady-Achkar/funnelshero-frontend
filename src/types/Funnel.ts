export interface IPage {
	isPublished: boolean
	_id: string
	title: string
	data: string
	createdAt: Date
	updatedAt: Date
	link: string
	publishedAt: Date
}

export interface Publish {
	pages: IPage[]
}

export interface IFunnel {
	publish: Publish
	favIcon: string
	pages: IPage[]
	_id: string
	proDomain: string
	category: string
	title: string
	isActive:boolean
	contactEmail: string
	createdAt: Date
	updatedAt: Date
	baseDomain: string
}
