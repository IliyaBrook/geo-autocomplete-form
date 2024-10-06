import type { Gutter } from 'antd/es/grid/row'
import React from 'react'

export const googleLibraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = ['places']

export interface Address {
	name: string;
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

type ColSpanType = number | string;

export interface AutoCompleteComponentProps {
	API_KEY: string;
	onFinish?: (address: Address) => void;
	formRowGutter?: Gutter | [Gutter, Gutter];
	countyColSpan?: ColSpanType;
	cityColSpan?: ColSpanType;
	submitColSpan?: ColSpanType;
	cityClassName?: string;
	countryClassName?: string;
	submitClassName?: string;
	cityStyle?: React.CSSProperties;
	countryStyle?: React.CSSProperties;
	submitStyle?: React.CSSProperties;
	cityPlaceholder?: string;
	countryPlaceholder?: string;
	submitText?: string;
	loading?: boolean;
	rowWrapperClassName?: string;
	rowWrapperStyle?: React.CSSProperties;
	cityColClassName?: string;
	cityColStyle?: React.CSSProperties;
	countryColClassName?: string;
	countryColStyle?: React.CSSProperties;
	submitColClassName?: string;
	submitColStyle?: React.CSSProperties;
	citySkeletonClassName?: string;
	citySkeletonStyle?: React.CSSProperties;
	countrySkeletonClassName?: string;
	countrySkeletonStyle?: React.CSSProperties;
	submitSkeletonClassName?: string;
	submitSkeletonStyle?: React.CSSProperties;
}
