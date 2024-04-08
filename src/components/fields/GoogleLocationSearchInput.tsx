import { useState } from "react";
import { getGeocode } from "use-places-autocomplete";

type AutocompleteProps = {
  setData: React.Dispatch<React.SetStateAction<any>>;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
  className: string;
};

const GoogleLocationSearchInput: React.FC<AutocompleteProps> = ({
  inputRef,
  setData,
  placeholder = "",
  className,
}) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        handleSearch(inputValue);
      }, 500) // Adjust the delay time here (in milliseconds)
    );
  };

  const handleSearch = async (inputValue: string) => {
    try {
      if (!inputValue || inputValue === "") {
        setData(null);
        return;
      }
      const results = await getGeocode({ address: inputValue });
      if (results) {
        const address = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          formatted_address: results[0].formatted_address,
        };
        setData(address); // Update state
      }
    } catch (error) {
      console.error("Error fetching Google Maps data:", error);
    }
  };

  return (
    <input
      type="text"
      className={className}
      onChange={handleChange}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};

export default GoogleLocationSearchInput;
