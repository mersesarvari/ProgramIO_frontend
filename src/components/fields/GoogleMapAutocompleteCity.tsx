import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

const AutocompleteInput = () => {
  const [address, setAddress] = useState("");
  const [googleMapData, setGoogleMapData] = useState(null);

  const handleChange = (e) => {
    setAddress(e.target.value);
    console.log(e.target.value);
    handleSearch(); // Call handleSearch whenever the input changes
  };

  const {
    suggestions: { status, options },
  } = usePlacesAutocomplete({
    debounce: 300,
    // Set the value to address state
    value: address,
  });

  const handleSearch = async () => {
    if (!address) return;

    try {
      const results = await getGeocode({ address });
      if (results) {
        console.log("Search info:", results[0].geometry.location);
        const address = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          formatted_address: results[0].formatted_address,
        };
        setGoogleMapData(address); // Update state
      }
    } catch (error) {
      console.error("Error fetching Google Maps data:", error);
    }
  };

  return (
    <div>
      <input // Input field is always enabled
        type="text"
        value={address}
        onChange={handleChange}
        placeholder="Enter address"
      />
      {status === "OK" && options.length > 0 && (
        <ul>
          {options.map((option) => (
            <li
              key={option.description}
              onClick={() => setAddress(option.description)}
            >
              {option.description}
            </li>
          ))}
        </ul>
      )}
      {googleMapData && (
        <pre>
          {/* Display retrieved Google Maps data */}
          Latitude: {googleMapData.lat}
          Longitude: {googleMapData.lng}
          Formatted Address: {googleMapData.formatted_address}
        </pre>
      )}
    </div>
  );
};

export default AutocompleteInput;
