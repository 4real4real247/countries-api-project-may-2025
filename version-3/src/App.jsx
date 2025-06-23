import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import { Routes, Route, Link } from "react-router-dom"; // React Router components for navigation
import Home from "./pages/Home"; // Home component for displaying country list
import SavedCountries from "./pages/SavedCountries"; // SavedCountries component for showing saved countries
import CountryDetail from "./pages/CountryDetail"; // CountryDetail component to show detailed info about a country
import localData from "../localData"; // Local backup data to use in case of API failure
import "./App.css"; // Import styling for the app

function App() {
  const [countries, setCountries] = useState([]); // State for storing the list of countries Create a box to store the final list of countries we'll show
  const [darkMode, setDarkMode] = useState(false); // State for tracking dark mode Keep track of whether we're in dark mode (off by default)
  const [isLoading, setIsLoading] = useState(true); // Loading indicator This tracks if we're still waiting on data to load
  const [error, setError] = useState(null); // Error message If something goes wrong, we save the error message here

  // Toggle between dark/light theme
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // The moment the app first shows up, we want to fetch country data
  useEffect(() => {
    setIsLoading(true); //Tell the app we're starting a loading cycle

    //Try getting the list of all countries from the REST Countries API
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region"
    )
      .then((res) => {
        //If the response isn't OK (like 404 or 500), we stop and throw an error
        if (!res.ok) throw new Error("Failed to fetch countries");
        //If the response is OK, we turn it into readable JSON
        return res.json();
      })
      .then((data) => {
        //Now we reshape the data using .map()
        //map() goes through every single country and transforms it into a smaller, cleaned-up version
        const formatted = data
          .map((c) => ({
            id: c.cca3, //Use the 3-letter country code as a unique ID
            name: c.name.common, //Grab the common name like "Japan"
            population: c.population?.toLocaleString() || "N/A", //Format the population nicely, like "125,000,000"
            region: c.region || "N/A", //If a region exists, use it; if not, say "N/A"
            capital: c.capital?.[0] || "N/A", //Use the first capital city from the list (if it exists)
            flag: c.flags?.svg || "", //Get the URL for the SVG version of the flag image
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); //Sort the final list alphabetically by country name
        //// localeCompare() helps avoid weird behavior with accented letters or different alphabets

        setCountries(formatted); //Save the tidy list of countries into state
        setError(null); //Clear out any old error messages
      })
      .catch((err) => {
        //If something breaks (like internet issues), we handle it here
        console.error("Using local data:", err); //Show the error in the console (for devs)
        setError(err.message); //Save the error message so we can show the user
        //Use backup data stored locally on our side (not from the internet)
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name))
          //Still sort this backup list alphabetically so it looks nice
        );
      })
      // This runs no matter what: success or failure. We’re done loading!
      .finally(() => setIsLoading(false));
    //Only run this once when the page first loads—like startup code
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <header className="header">
        <Link to="/" className="logo">
          Where in the world?
        </Link>

        {/* ← Updated link path */}
        <Link to="/saved-countries" className="saved-link">
          Saved Countries
        </Link>

        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </header>

      {isLoading ? (
        <div className="loading">Loading countries...</div>
      ) : error ? (
        <div className="error">Error: {error}. Showing fallback data.</div>
      ) : (
        <Routes>
          <Route path="/" element={<Home countries={countries} />} />
          <Route
            path="/saved-countries"
            element={
              <SavedCountries darkMode={darkMode} countries={countries} />
            }
          />
          <Route
            path="/country-detail/:country_name"
            element={<CountryDetail countries={countries} />}
          />
          {/* Optional 404 fallback */}
          <Route path="*" element={<div>404 — page not found</div>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
