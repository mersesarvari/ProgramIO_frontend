import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

type AutocompleteProps = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
  className: string;
};

const GoogleLocationSearchInput: React.FC<AutocompleteProps> = ({
  data,
  inputRef,
  setData,
  placeholder = "",
  className,
}) => {
  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    setAddress(e.target.value);
    //console.log(e.target.value);
    handleSearch(); // Call handleSearch whenever the input changes
  };

  /*   const {
    suggestions: { status, options },
  } = usePlacesAutocomplete({
    debounce: 300,
    value: address,
  }); */

  const handleSearch = async () => {
    if (!address || address === "") {
      setData(null);
      return;
    }

    try {
      const results = await getGeocode({ address });
      if (results) {
        //console.log("Search info:", results[0].geometry.location);
        const address = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          formatted_address: results[0].formatted_address,
        };
        setData(address); // Update state
      }
    } catch (error) {
      //console.error("Error fetching Google Maps data:", error);
    }
  };

  return (
    <input
      type="text"
      className={className}
      value={address}
      onChange={handleChange}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};

export default GoogleLocationSearchInput;
