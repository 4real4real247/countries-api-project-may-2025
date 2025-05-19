// CountryDetail.jsx

import { useParams } from "react-router-dom"; // Import useParams to read URL parameters

function CountryDetail({ countries }) {
  // Read the country name from the URL using useParams
  const { countryName } = useParams();

  // Find the specific country object from the list of countries
  const selectedCountry = countries.find(
    (country) => country.name === countryName
  );

  // If country is not found, show a message
  if (!selectedCountry) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      {/* Display country details */}
      <h1>{selectedCountry.name}</h1>
      <img src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} />
      <p>
        <strong>Capital:</strong> {selectedCountry.capital}
      </p>
      <p>
        <strong>Population:</strong> {selectedCountry.population}
      </p>
      <p>
        <strong>Region:</strong> {selectedCountry.region}
      </p>
    </div>
  );
}

export default CountryDetail; // Export the component
