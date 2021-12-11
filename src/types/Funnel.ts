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

export interface ILink {
	title: string
	href: string
}

export interface IMenu {
	title: string
	links: ILink[]
	_id: string
	updatedAt: Date
	createdAt: Date
}
export interface Publish {
	pages: IPage[]
}

export interface IFunnel {
	publish: Publish
	favIcon: string
	pages: IPage[]
	_id: string
	menus: IMenu[]
	proDomain: string
	category: string
	title: string
	isActive: boolean
	contactEmail: string
	createdAt: Date
	updatedAt: Date
	baseDomain: string
}
