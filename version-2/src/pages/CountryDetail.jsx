import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
  const { countryName } = useParams();

  const selectedCountry = countries.find(
    (country) => country.name === countryName
  );

  const [viewCount, setViewCount] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!selectedCountry) return;

    const viewData = JSON.parse(localStorage.getItem("viewCounts")) || {};
    const currentCount = viewData[selectedCountry.name] || 0;
    const updatedCount = currentCount + 1;
    viewData[selectedCountry.name] = updatedCount;

    localStorage.setItem("viewCounts", JSON.stringify(viewData));
    setViewCount(updatedCount);
  }, [selectedCountry]);

  const handleSaveCountry = () => {
    if (!selectedCountry) return;

    const existing = JSON.parse(localStorage.getItem("savedCountries")) || [];
    const alreadyExists = existing.some((c) => c.name === selectedCountry.name);

    if (!alreadyExists) {
      const updatedList = [...existing, selectedCountry];
      localStorage.setItem("savedCountries", JSON.stringify(updatedList));
      setSaved(true);
    } else {
      setSaved(true); // Optional: still show as saved if already present
    }
  };

  if (!selectedCountry) {
    return <div>Country not found.</div>;
  }

  return (
    <div className="country-detail-page">
      <img
        src={selectedCountry.flag}
        alt={`${selectedCountry.name} flag`}
        className="detail-flag"
      />
      {/* Country name under the flag */}
      <h1>{selectedCountry.name}</h1>
      {/* Capital and other details below the name */}
      <p>
        <strong>Capital:</strong> {selectedCountry.capital}
      </p>
      <p>
        <strong>Population:</strong> {selectedCountry.population}
      </p>
      <p>
        <strong>Region:</strong> {selectedCountry.region}
      </p>
      <p>
        <strong>Viewed:</strong> {viewCount}{" "}
        {viewCount === 1 ? "time" : "times"}
      </p>
      <button onClick={handleSaveCountry} className="save-button">
        {saved ? "Country Saved!" : "Save Country"}
      </button>
    </div>
  );
}

export default CountryDetail;
