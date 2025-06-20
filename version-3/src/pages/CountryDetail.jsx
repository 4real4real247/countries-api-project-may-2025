import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

//
// Custom hook to increment & fetch view count
//
function useViewCount(countryName) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;
    let isMounted = true;

    async function updateCount() {
      try {
        const res = await fetch("/api/update-one-country-count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country_name: countryName }),
        });
        if (!res.ok) throw new Error("Failed to update view count");
        const { newCount } = await res.json();
        if (isMounted) setCount(newCount);
      } catch (err) {
        console.error("useViewCount error:", err);
        if (isMounted) setError(err);
      }
    }

    updateCount();
    return () => {
      isMounted = false;
    };
  }, [countryName]);

  return { count, error };
}

//
// Custom hook to save a country
//
function useSaveCountry() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const save = useCallback(async (countryId) => {
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/save-one-country", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_id: countryId }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
    } catch (err) {
      console.error("useSaveCountry error:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { saved, loading, error, save };
}

//
// CountryDetail component
//
export default function CountryDetail({ countries }) {
  const { country_name } = useParams();
  const navigate = useNavigate();

  // Find the selected country
  const country = countries.find((c) => c.name === country_name);
  const { count: viewCount, error: viewError } = useViewCount(country?.name);
  const { saved, loading, error: saveError, save } = useSaveCountry();

  // After a successful save, redirect
  useEffect(() => {
    if (saved) {
      navigate("/saved-countries");
    }
  }, [saved, navigate]);

  if (!country) {
    return <div>Country not found.</div>;
  }

  return (
    <div className="country-detail-page">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="detail-flag"
      />
      <h1>{country.name}</h1>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>

      <p>
        <strong>Viewed:</strong>{" "}
        {viewError ? "—" : `${viewCount} ${viewCount === 1 ? "time" : "times"}`}
      </p>

      <button
        onClick={() => save(country.name)}
        disabled={loading || saved}
        className="save-button"
      >
        {loading ? "Saving…" : saved ? "✓ Saved" : "Save Country"}
      </button>

      {saveError && <div className="error">{saveError}</div>}
    </div>
  );
}
