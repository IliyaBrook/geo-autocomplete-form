
# GeoAutocompleteForm

`GeoAutocompleteForm` is a React component that allows users to autofill geolocation information based on the input of a city and country. It utilizes the Google Maps API (Places Library) and Ant Design for UI elements.

## Features

- Autofill suggestions for cities and countries.
- Uses Google Maps API (Places Library) to fetch geolocation data.
- Displays city and country input fields with autocompletion and suggestions.
- Returns an address object containing city, country, latitude, and longitude upon submission.
- Customizable styles and placeholders for each field.

## Installation

1. Install Ant Design and React Google Maps API.

```bash
yarn add antd @react-google-maps/api
```

2. Get a Google Maps API key with access to the "Places" library.

## Props

### `AutoCompleteComponentProps`

| Prop Name                | Type                     | Default Value       | Description                                                                                                                                  |
|--------------------------|--------------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `API_KEY`                | `string`                 | `undefined`         | Your Google Maps API Key. Required to load the Places Library.                                                                                |
| `onFinish`               | `(address: Address) => void` | `undefined`         | Callback function triggered on form submission, returning the selected address information.                                                   |
| `formRowGutter`          | `Gutter or [Gutter, Gutter]` | `[10, 10]`          | Gutter size for the layout grid of the form.                                                                                                  |
| `countyColSpan`          | `number | string`         | `24`                | Column span for the country input field.                                                                                                      |
| `cityColSpan`            | `number | string`         | `24`                | Column span for the city input field.                                                                                                         |
| `submitColSpan`          | `number | string`         | `24`                | Column span for the submit button.                                                                                                            |
| `cityClassName`          | `string`                 | `undefined`         | CSS class for the city input field.                                                                                                           |
| `countryClassName`       | `string`                 | `undefined`         | CSS class for the country input field.                                                                                                        |
| `submitClassName`        | `string`                 | `undefined`         | CSS class for the submit button.                                                                                                              |
| `cityStyle`              | `React.CSSProperties`    | `undefined`         | Inline style for the city input field.                                                                                                        |
| `countryStyle`           | `React.CSSProperties`    | `undefined`         | Inline style for the country input field.                                                                                                     |
| `submitStyle`            | `React.CSSProperties`    | `undefined`         | Inline style for the submit button.                                                                                                           |
| `cityPlaceholder`        | `string`                 | `'Select city'`      | Placeholder text for the city input field.                                                                                                    |
| `countryPlaceholder`     | `string`                 | `'Select country'`   | Placeholder text for the country input field.                                                                                                 |
| `submitText`             | `string`                 | `'Submit'`           | Text to display on the submit button.                                                                                                         |
| `loading`                | `boolean`                | `undefined`         | Shows a loading state if set to true.                                                                                                         |
| `rowWrapperClassName`    | `string`                 | `undefined`         | CSS class for the wrapper row element.                                                                                                        |
| `rowWrapperStyle`        | `React.CSSProperties`    | `undefined`         | Inline style for the wrapper row element.                                                                                                     |
| `cityColClassName`       | `string`                 | `undefined`         | CSS class for the column containing the city input field.                                                                                     |
| `cityColStyle`           | `React.CSSProperties`    | `undefined`         | Inline style for the column containing the city input field.                                                                                  |
| `countryColClassName`    | `string`                 | `undefined`         | CSS class for the column containing the country input field.                                                                                  |
| `countryColStyle`        | `React.CSSProperties`    | `undefined`         | Inline style for the column containing the country input field.                                                                               |
| `submitColClassName`     | `string`                 | `undefined`         | CSS class for the column containing the submit button.                                                                                        |
| `submitColStyle`         | `React.CSSProperties`    | `undefined`         | Inline style for the column containing the submit button.                                                                                     |
| `citySkeletonClassName`  | `string`                 | `undefined`         | CSS class for the skeleton loader of the city input field.                                                                                    |
| `citySkeletonStyle`      | `React.CSSProperties`    | `undefined`         | Inline style for the skeleton loader of the city input field.                                                                                 |
| `countrySkeletonClassName` | `string`               | `undefined`         | CSS class for the skeleton loader of the country input field.                                                                                 |
| `countrySkeletonStyle`   | `React.CSSProperties`    | `undefined`         | Inline style for the skeleton loader of the country input field.                                                                              |
| `submitSkeletonClassName` | `string`                | `undefined`         | CSS class for the skeleton loader of the submit button.                                                                                       |
| `submitSkeletonStyle`    | `React.CSSProperties`    | `undefined`         | Inline style for the skeleton loader of the submit button.                                                                                    |

## `Address` Object

The `Address` object returned in the `onFinish` callback contains the following properties:

| Property  | Type     | Description                           |
|-----------|----------|---------------------------------------|
| `name`    | `string` | Full formatted address.               |
| `city`    | `string` | Name of the selected city.            |
| `country` | `string` | Name of the selected country.         |
| `latitude`| `number` | Latitude coordinate of the location.  |
| `longitude`| `number`| Longitude coordinate of the location. |

## Example Usage

```tsx
import React from 'react';
import GeoAutocompleteForm from './GeoAutocompleteForm';

const MyComponent = () => {
  const handleFinish = (address) => {
    console.log('Selected Address:', address);
  };

  return (
    <GeoAutocompleteForm 
      API_KEY="YOUR_GOOGLE_MAPS_API_KEY" 
      onFinish={handleFinish} 
    />
  );
};

export default MyComponent;
```

## Error Handling

- If the `API_KEY` is missing, the component will display a message asking the user to provide a valid Google Maps API key.
- If there is a failure to load the Google Maps API, it will display an error message.

## Skeleton States

Skeletons are displayed while the Google Maps API is loading or if the `loading` prop is set to true. You can customize the skeleton styles with the `citySkeletonClassName`, `countrySkeletonClassName`, and `submitSkeletonClassName` props.

## License

This project is licensed under the MIT License.
