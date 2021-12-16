
export interface Metadata {
}

export interface Metadata2 {
}

export interface Product {
	id: string;
	object: string;
	active: boolean;
	attributes: any[];
	created: number;
	description?: any;
	images: any[];
	livemode: boolean;
	metadata: Metadata2;
	name: string;
	package_dimensions?: any;
	shippable?: any;
	statement_descriptor?: any;
	tax_code: string;
	type: string;
	unit_label?: any;
	updated: number;
	url?: any;
}

export interface Recurring {
	aggregate_usage?: any;
	interval: string;
	interval_count: number;
	trial_period_days: number;
	usage_type: string;
}

export interface IBundle {
	id: string;
	object: string;
	active: boolean;
	billing_scheme: string;
	created: number;
	currency: string;
	livemode: boolean;
	lookup_key: string;
	metadata: Metadata;
	nickname?: any;
	product: Product;
	recurring: Recurring;
	tax_behavior: string;
	tiers_mode?: any;
	transform_quantity?: any;
	type: string;
	unit_amount: number;
	unit_amount_decimal: string;
}