import { useJsApiLoader } from '@react-google-maps/api'
import { AutoComplete, Button, Col, Input, Row, Skeleton } from 'antd'
import React, { useState } from 'react'
import { type AutoCompleteComponentProps, googleLibraries } from './types/types'

const GeoAutocompleteForm: React.FC<AutoCompleteComponentProps> = ({
	                                                                   API_KEY,
	                                                                   onFinish,
	                                                                   formRowGutter = [10, 10],
	                                                                   countyColSpan = 24,
	                                                                   cityColSpan = 24,
	                                                                   submitColSpan = 24,
	                                                                   countryClassName,
	                                                                   countryStyle,
	                                                                   cityPlaceholder = 'Select city',
	                                                                   cityClassName,
	                                                                   cityStyle,
	                                                                   countryPlaceholder = 'Select country',
	                                                                   submitClassName,
	                                                                   submitStyle,
	                                                                   submitText = 'Submit',
	                                                                   loading,
	                                                                   rowWrapperClassName,
	                                                                   rowWrapperStyle,
	                                                                   cityColClassName,
	                                                                   countryColClassName,
	                                                                   countryColStyle,
	                                                                   submitColClassName,
	                                                                   submitColStyle,
	                                                                   cityColStyle,
	                                                                   citySkeletonClassName,
	                                                                   countrySkeletonClassName,
	                                                                   submitSkeletonClassName,
	                                                                   countrySkeletonStyle,
	                                                                   submitSkeletonStyle,
	                                                                   citySkeletonStyle
                                                                   }: AutoCompleteComponentProps) => {
	const [city, setCity] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [countryCode, setCountryCode] = useState<string>('')
	const [cityOptions, setCityOptions] = useState<{ value: string }[]>([])
	const [countryOptions, setCountryOptions] = useState<{ value: string }[]>([])
	const [countrySelected, setCountrySelected] = useState<boolean>(false)
	
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: API_KEY,
		libraries: googleLibraries
	})
	
	const fetchCitySuggestions = async (input: string) => {
		if (!input.trim()) return
		const autocompleteService = new window.google.maps.places.AutocompleteService()
		await autocompleteService.getPlacePredictions(
			{
				input,
				types: ['(cities)'],
				componentRestrictions: { country: countryCode }
			},
			(predictions, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
					setCityOptions(
						predictions.map((prediction) => ({
							value: prediction.description
						}))
					)
				}
			}
		)
	}
	
	const fetchCountrySuggestions = async (input: string) => {
		const autocompleteService = new window.google.maps.places.AutocompleteService()
		await autocompleteService.getPlacePredictions(
			{ input, types: ['(regions)'] },
			(predictions, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
					setCountryOptions(
						predictions.map((prediction) => ({
							value: prediction.description
						}))
					)
				}
			}
		)
	}
	
	const handleCityChange = (value: string) => {
		setCity(value)
		if (value) {
			void fetchCitySuggestions(value)
		}
	}
	
	const handleCountryChange = (value: string) => {
		setCountry(value)
		if (value) {
			void fetchCountrySuggestions(value)
			const geocoder = new window.google.maps.Geocoder()
			void geocoder.geocode({ address: value }, (results, status) => {
				if (status === 'OK' && results && results.length > 0) {
					const countryResult = results[0]
					const countryComponent = countryResult.address_components.find((component) =>
						component.types.includes('country')
					)
					if (countryComponent) {
						setCountryCode(countryComponent.short_name)
						void fetchCitySuggestions('')
					}
				}
			})
		}
		if (countrySelected) {
			setCountrySelected(false)
		}
	}
	
	const handlePlaceSelection = () => {
		const geocoder = new window.google.maps.Geocoder()
		void geocoder.geocode({ address: `${city}, ${country}` }, (results, status) => {
			if (status === 'OK' && results && results.length > 0) {
				const location = results[0].geometry.location
				onFinish && onFinish({
					name: results[0].formatted_address,
					city,
					country,
					latitude: location.lat(),
					longitude: location.lng()
				})
			}
		})
	}
	
	const handleSubmit = () => {
		if (city && country) {
			handlePlaceSelection()
			
		}
	}
	
	if (!API_KEY) {
		return (
			<div>
				Google maps api key is required to use this component, get one from{' '}
				<a
					href='https://developers.google.com/maps/documentation/javascript/'
					rel='nofollow'
					target='Maps API'>
					Google maps Platform
				</a>
			</div>
		)
	}
	
	if (loadError) {
		return <div>Error loading Google Maps API</div>
	}
	
	return (
		<Row
			gutter={formRowGutter}
			className={rowWrapperClassName}
			style={rowWrapperStyle}
		>
			<Col
				span={countyColSpan}
				className={countryColClassName}
				style={countryColStyle}
			>
				{
					(isLoaded && !loading) ? (
						<AutoComplete
							value={country}
							onChange={handleCountryChange}
							options={countryOptions}
							onSelect={() => {
								setCountrySelected(true)
							}}
							placeholder={countryPlaceholder}
							filterOption={false}
							className={countryClassName}
							style={countryStyle}
						>
							<Input />
						</AutoComplete>
					) : (
						<Skeleton.Input
							active={true}
							style={countrySkeletonStyle ? { width: '182.89px' } : {}}
							className={countrySkeletonClassName}
						/>
					)
				}
			</Col>
			<Col
				span={cityColSpan}
				className={cityColClassName}
				style={cityColStyle}
			>
				{
					(isLoaded && !loading) ? (
						<AutoComplete
							value={city}
							onChange={handleCityChange}
							options={cityOptions}
							placeholder={cityPlaceholder}
							filterOption={false}
							disabled={!countryCode}
							className={cityClassName}
							style={cityStyle}
						>
							<Input />
						</AutoComplete>
					) : (
						<Skeleton.Input
							active={true}
							style={citySkeletonStyle ? { width: '182.89px' } : {}}
							className={citySkeletonClassName}
						/>
					)
				}
			</Col>
			<Col
				span={submitColSpan}
				className={submitColClassName}
				style={submitColStyle}
			>
				{
					(isLoaded && !loading) ? (
						<Button
							type='primary'
							onClick={handleSubmit}
							className={submitClassName}
							style={submitStyle}
						>
							{submitText}
						</Button>
					) : (
						<Skeleton.Button
							active={true}
							style={submitSkeletonStyle ? { width: '75.57px' } : {}}
							className={submitSkeletonClassName}
						/>
					)
				}
			</Col>
		</Row>
	)
}

export default GeoAutocompleteForm
