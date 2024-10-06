import React, { useState } from "react";
import { Input, AutoComplete, Button } from "antd";
import { LoadScript, useJsApiLoader } from "@react-google-maps/api";

const googleLibraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface Address {
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface AutoCompleteComponentProps {
  API_KEY: string;
}

const GeoAutocomplete: React.FC<AutoCompleteComponentProps> = ({ API_KEY }) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<{ value: string }[]>([]);
  const [countryOptions, setCountryOptions] = useState<{ value: string }[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: googleLibraries,
  });
  
  const fetchCitySuggestions = async (input: string) => {
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    await autocompleteService.getPlacePredictions(
      { input, types: ["(cities)"] },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setCityOptions(
            predictions.map((prediction) => ({
              value: prediction.description,
            }))
          );
        }
      }
    );
  };
  
  const fetchCountrySuggestions = async (input: string) => {
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    await autocompleteService.getPlacePredictions(
      { input, types: ["(regions)"] },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setCountryOptions(
            predictions.map((prediction) => ({
              value: prediction.description,
            }))
          );
        }
      }
    );
  };
  
  const handleCityChange = (value: string) => {
    setCity(value);
    if (value) {
      fetchCitySuggestions(value);
    }
  };
  
  const handleCountryChange = (value: string) => {
    setCountry(value);
    if (value) {
      fetchCountrySuggestions(value);
    }
  };
  
  const handlePlaceSelection = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: `${city}, ${country}` }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const location = results[0].geometry.location;
        setAddress({
          name: results[0].formatted_address,
          city,
          country,
          latitude: location.lat(),
          longitude: location.lng(),
        });
      }
    });
  };
  
  const handleSubmit = () => {
    if (city && country) {
      handlePlaceSelection();
    }
  };
  
  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={googleLibraries}>
      {isLoaded ? (
        <div style={{ width: "300px" }}>
          <AutoComplete
            value={country}
            onChange={handleCountryChange}
            options={countryOptions}
            placeholder="Select country"
            filterOption={false}
          >
            <Input />
          </AutoComplete>
          
          <AutoComplete
            value={city}
            onChange={handleCityChange}
            options={cityOptions}
            placeholder="Select city"
            filterOption={false}
          >
            <Input />
          </AutoComplete>
          
          <Button type="primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
            Submit
          </Button>
          <pre>
            {JSON.stringify(address, null, 2)}
          </pre>
          {address && (
            <div>
              <h3>Selected Region Details:</h3>
              <pre>{JSON.stringify(address, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </LoadScript>
  );
};

export default GeoAutocomplete;
