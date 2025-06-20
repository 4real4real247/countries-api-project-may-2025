import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import { Routes, Route, Link } from "react-router-dom"; // React Router components for navigation
import Home from "./pages/Home"; // Home component for displaying country list
import SavedCountries from "./pages/SavedCountries"; // SavedCountries component for showing saved countries
import CountryDetail from "./pages/CountryDetail"; // CountryDetail component to show detailed info about a country
import localData from "../localData"; // Local backup data to use in case of API failure
import "./App.css"; // Import styling for the app

function App() {
  const [countries, setCountries] = useState([]); // State for storing the list of countries
  const [darkMode, setDarkMode] = useState(false); // State for tracking dark mode
  const [isLoading, setIsLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message

  // Toggle between dark/light theme
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Fetch countries on mount (with localData fallback)
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        return res.json();
      })
      .then((data) => {
        const formatted = data
          .map((c) => ({
            id: c.cca3,
            name: c.name.common,
            population: c.population?.toLocaleString() || "N/A",
            region: c.region || "N/A",
            capital: c.capital?.[0] || "N/A",
            flag: c.flags?.svg || "",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
        setError(null);
      })
      .catch((err) => {
        console.error("Using local data:", err);
        setError(err.message);
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .finally(() => setIsLoading(false));
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
          {/* ← Match the link `/saved-countries` here */}
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
