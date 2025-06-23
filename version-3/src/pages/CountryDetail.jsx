import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

//
// Custom hook to increment & fetch view count

function useViewCount(countryName) {
  // // Create a state variable called count, starting at 0
  const [count, setCount] = useState(0);
  // Create a state variable for errors, starting as null
  const [error, setError] = useState(null);

  //Initializes the count and error state.On mount or when countryName changes it Sends a POST request to increment and fetch the view count for a given country.Updates count with the response newCount Handles and stores any fetch errors, This runs once, when the CountryDetail component is rendered with a valid countryName
  useEffect(() => {
    //If there's no country name, don’t do anything
    if (!countryName) return;
    //Keep track of whether the component is still showing
    let isMounted = true;

    //Create an async function to update view count from the server
    async function updateCount() {
      try {
        // Send a POST request to increment and fetch new count
        const res = await fetch("/api/update-one-country-count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country_name: countryName }),
        });
        // If the response is not okay, throw an error
        if (!res.ok) throw new Error("Failed to update view count");
        // Extract newCount from the server's response
        const { newCount } = await res.json();
        // Only update the count if the component is still visible
        if (isMounted) setCount(newCount);
      } catch (err) {
        // Log the error and store it
        console.error("useViewCount error:", err);
        if (isMounted) setError(err);
      }
    }
    // Call the function to perform the network request
    updateCount();

    // Cleanup function if component unmounts before request finishes
    return () => {
      isMounted = false;
    };
  }, [countryName]); //// Re-run this effect when the country name changes

  /// Return current view count and any error that happened
  return { count, error };
}
///////////////END of HOOK useVewCount////////////////////

// Custom hook to save a country///////////////////
//Tracks whether a country has been saved, is loading, or has an error Returns a save function that sends a post request to save the country if it happens sets saved to true  and on failure it sets an error and resets loading
function useSaveCountry() {
  // State to track if the country was saved
  const [saved, setSaved] = useState(false);
  // State to track if we're in the middle of saving
  const [loading, setLoading] = useState(false);
  // State to store any save error
  const [error, setError] = useState(null);

  // Define the save function and memoize it with useCallback
  const save = useCallback(async (countryId) => {
    setLoading(true); // Show loading UI
    setError(null); // Clear past errors
    setSaved(false); //// Reset saved status

    try {
      // Send a POST request to save the country
      const res = await fetch("/api/save-one-country", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_id: countryId }),
      });

      // If the request fails, throw an error
      if (!res.ok) throw new Error("Save failed");
      // Mark the country as saved
      setSaved(true);
    } catch (err) {
      // Log the error and show message to user
      console.error("useSaveCountry error:", err);
      setError("Failed to save. Please try again.");
    } finally {
      // Stop showing the loading state
      setLoading(false);
    }
  }, []);
  // Return useful values and the save function to use in other components
  return { saved, loading, error, save };
}
//////////END OF useSaveCountry///////////////////////////////

///////////////////// CountryDetail component////////////////////////////

//useParams grabs the country_name from the URL It finds the matching country from the countries prop
export default function CountryDetail({ countries }) {
  // Get the country name from the current URL
  const { country_name } = useParams();
  // Get navigation function to redirect user to different pages
  const navigate = useNavigate();

  // it callss both custons hooks useViewCOunt tracks how many time this country's page has been visited and useSavedCOuntry handles saving the country
  // Find the country object in the array by name
  const country = countries.find((c) => c.name === country_name);
  // Call the custom hook to track how many times this country was viewed
  const { count: viewCount, error: viewError } = useViewCount(country?.name);
  // Call the custom hook to allow saving the country
  const { saved, loading, error: saveError, save } = useSaveCountry();

  // After a successful save, redirect this checks if saved is true. If so, it: Calls navigate("/saved-countries") to redirect to the saved countries page. just so user didnt have to click somewhere esle it redirects automacliiy
  useEffect(() => {
    if (saved) {
      navigate("/saved-countries");
    }
  }, [saved, navigate]);
  //// If the country isn't found in the list, show a message
  if (!country) {
    return <div>Country not found.</div>;
  }
  // Otherwise, show the country details on the page
  return (
    <div className="country-detail-page">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="detail-flag"
      />
      <h1>{country.name}</h1>
      {/* Display capital, population, and region */}
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      {/* Show how many times this country has been viewed */}
      <p>
        <strong>Viewed:</strong>{" "}
        {viewError ? "—" : `${viewCount} ${viewCount === 1 ? "time" : "times"}`}
      </p>
      {/* Show Save Country button, disable if loading or already saved */}
      <button
        onClick={() => save(country.name)} //Trigger save when clicked
        disabled={loading || saved} //Disable button if already saved or saving
        className="save-button"
      >
        {loading ? "Saving…" : saved ? "✓ Saved" : "Save Country"}
      </button>
      {/*Show any error message from saving */}
      {saveError && <div className="error">{saveError}</div>}
    </div>
  );
}
